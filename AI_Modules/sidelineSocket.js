import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI } from '@google/genai';
import { ingestMemoryPayload } from './ingestionService.js';
import { retrieveEraContext } from './ragEngine.js';
import { 
  buildYoungerSelfSystemPrompt, 
  calculateEraAge, 
  detectCrisisKeywords, 
  detectBurnoutKeywords,
  parseMemoriesFromContext
} from './personaOrchestrator.js';
import { perceiveImage, normalizeImageSource } from './multimodalPerception.js';
import { synthesizeLearnedInsights } from './learningEngine.js';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const MAX_HISTORY_TURNS = 10; // Sliding window max turns
const MIN_PROMPT_INTERVAL_MS = 500; // Prompts closer together than this are queued (TC004e)
const MAX_QUEUED_PROMPTS = 5; // Per-session backlog cap before prompts are rejected
const MAX_WS_PAYLOAD_BYTES = 25 * 1024 * 1024; // Room for a compressed base64 photo + timeline nodes (matches the REST body limit)

// Active WebSocket Sessions Store
const activeSessions = new Map();

/**
 * Extracts key insight quote from full response text.
 * @param {string} fullText 
 * @returns {string} Inspirational quote snippet
 */
function extractInsightQuote(fullText) {
  if (!fullText) return "Keep grinding—every play counts toward our legacy!";
  
  const sentences = fullText.split(/(?<=[.!?])\s+/);
  const keySentence = sentences.find(s => 
    s.toLowerCase().includes('remember') || 
    s.toLowerCase().includes('dream') || 
    s.toLowerCase().includes('win') || 
    s.toLowerCase().includes('sacrificed') || 
    s.toLowerCase().includes('grind')
  );

  return keySentence || sentences[0] || "Keep grinding—every play counts toward our legacy!";
}

/**
 * Helper to sleep for simulated real-time token streaming.
 * @param {number} ms 
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Phase 4: Sideline AI Real-Time WebSocket Streaming & Instant Learning Controller
 * 
 * Attaches to an HTTP server or creates a WebSocket server listening on path /ws/sideline-ai
 * Includes 30s ping/pong heartbeat and multi-turn sliding window history memory management.
 * 
 * @param {object} [options]
 * @param {import('http').Server} [options.server] - Existing HTTP Server instance
 * @param {number} [options.port=5001] - Port to bind if no HTTP server provided
 * @returns {WebSocketServer} Created WebSocket Server instance
 */
export function initSidelineWebSocketServer(options = {}) {
  const wss = options.server 
    ? new WebSocketServer({ server: options.server, path: '/ws/sideline-ai', maxPayload: MAX_WS_PAYLOAD_BYTES })
    : new WebSocketServer({ port: options.port || 5001, path: '/ws/sideline-ai', maxPayload: MAX_WS_PAYLOAD_BYTES });
  const onExchange = typeof options.onExchange === 'function' ? options.onExchange : null;

  console.log(`⚡ Sideline AI Real-Time WebSocket Server initialized on path /ws/sideline-ai`);

  // Heartbeat ping interval (30 seconds) to prevent connection timeouts on idle HUD drawers
  const pingInterval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on('close', () => clearInterval(pingInterval));

  wss.on('connection', (ws, req) => {
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });

    // Parse query params e.g. /ws/sideline-ai?userId=usr_123&era=Youth%20Era
    const urlObj = new URL(req.url || '', 'http://localhost');
    const userId = urlObj.searchParams.get('userId') || 'usr_default';
    const era = urlObj.searchParams.get('era') || 'Youth Era';
    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    const sessionState = {
      sessionId,
      userId,
      era,
      history: [],
      promptQueue: [],
      isStreaming: false,
      lastPromptAt: 0,
      connectedAt: new Date()
    };

    activeSessions.set(ws, sessionState);

    // Send connection acknowledgement to HUD drawer
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        event: 'connected',
        sessionId,
        userId,
        era,
        message: 'Sideline AI drawer connected in real-time mode.'
      }));
    }

    // Handle Incoming WebSocket Messages
    ws.on('message', async (data) => {
      try {
        let payload = {};
        try {
          payload = JSON.parse(data.toString());
        } catch {
          payload = { prompt: data.toString(), era: sessionState.era };
        }

        // -------------------------------------------------------------
        // INSTANT LEARNING HOOK (+ LOG PLAY EVENT)
        // -------------------------------------------------------------
        if (payload.event === 'log_play' || payload.action === 'LOG_PLAY') {
          const memoryData = payload.memoryData || payload;
          await handleInstantLearningEvent(ws, sessionState, memoryData);
          return;
        }

        // -------------------------------------------------------------
        // INCOMING CHAT PROMPT FLOW (Real-Time Token Streaming)
        // -------------------------------------------------------------
        const userPrompt = payload.prompt || payload.message || '';
        const selectedEra = payload.era || sessionState.era || 'Youth Era';
        const imageSource = payload.imageSource || payload.mediaUrl || payload.photo || null;
        const rawMemories = payload.clientMemories || payload.memories || [];
        sessionState.era = selectedEra;
        if (payload.domain) sessionState.domain = payload.domain;
        if (payload.journeyType) sessionState.journeyType = payload.journeyType;

        if (!String(userPrompt).trim() && !imageSource) return;

        // Rapid-fire prompts are queued and answered in order instead of interleaving streams
        const now = Date.now();
        const tooSoon = now - sessionState.lastPromptAt < MIN_PROMPT_INTERVAL_MS;
        sessionState.lastPromptAt = now;

        if (sessionState.isStreaming || tooSoon || sessionState.promptQueue.length > 0) {
          if (sessionState.promptQueue.length >= MAX_QUEUED_PROMPTS) {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({
                event: 'rate_limited',
                status: 'RATE LIMITED',
                queued: false,
                message: 'Too many prompts waiting. Please let the current reply finish.'
              }));
            }
            return;
          }
          sessionState.promptQueue.push({ userPrompt: String(userPrompt), selectedEra, imageSource, rawMemories });
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              event: 'rate_limited',
              status: 'RATE LIMITED',
              queued: true,
              position: sessionState.promptQueue.length,
              message: 'Prompt queued. Your younger self will answer in order.'
            }));
          }
        } else {
          sessionState.promptQueue.push({ userPrompt: String(userPrompt), selectedEra, imageSource, rawMemories });
        }

        await drainPromptQueue(ws, sessionState, onExchange);

      } catch (err) {
        console.error('Sideline WebSocket Processing Error:', err);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ event: 'error', message: 'Failed to process request.' }));
        }
      }
    });

    ws.on('close', () => {
      sessionState.promptQueue.length = 0;
      activeSessions.delete(ws);
    });

    ws.on('error', (err) => {
      console.warn('Sideline WebSocket client error:', err.message);
    });
  });

  wss.on('error', (err) => {
    console.warn('Sideline WebSocket server error:', err.message);
  });

  return wss;
}

/**
 * Answers queued prompts one at a time so each reply streams completely before the next starts.
 */
async function drainPromptQueue(ws, sessionState, onExchange) {
  if (sessionState.isStreaming) return;
  sessionState.isStreaming = true;
  try {
    while (sessionState.promptQueue.length > 0 && ws.readyState === WebSocket.OPEN) {
      const job = sessionState.promptQueue.shift();
      try {
        const result = await processStreamingChatFlow(ws, sessionState, job.userPrompt, job.selectedEra, job.imageSource, job.rawMemories);
        if (onExchange && result && result.fullResponse) {
          try {
            await onExchange({
              userId: sessionState.userId,
              era: job.selectedEra,
              journeyType: sessionState.journeyType || null,
              domain: sessionState.domain || null,
              prompt: job.userPrompt || 'Visual memory shared',
              response: result.fullResponse,
              crisisTriggered: Boolean(result.crisisTriggered)
            });
          } catch (saveErr) {
            console.warn('Sideline chat persistence warning:', saveErr.message);
          }
        }
      } catch (err) {
        console.error('Sideline WebSocket Processing Error:', err);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ event: 'error', message: 'Failed to process request.' }));
        }
      }
    }
  } finally {
    sessionState.isStreaming = false;
  }
}

/**
 * Handles Real-Time "Instant Learning" (+ LOG PLAY) Event
 * Vectorizes memory on the fly and updates memory index immediately.
 */
export async function handleInstantLearningEvent(ws, sessionState, memoryData) {
  try {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        event: 'learning_status',
        status: 'vectorizing',
        message: 'Perceiving visual elements & vectorizing play into 768-dim embeddings...'
      }));
    }

    // Multimodal Memory Ingestion: Ingest memory, perceive image, AES-256 encrypt, vectorize, store
    const ingestResult = await ingestMemoryPayload({
      userId: sessionState.userId,
      title: memoryData.title || 'New Play Logged',
      description: memoryData.description || memoryData.content || '',
      entryDate: memoryData.entryDate || new Date().toISOString().split('T')[0],
      era: memoryData.era || sessionState.era,
      emotionTags: memoryData.emotionTags || memoryData.tags || ['Triumph'],
      contextTags: memoryData.contextTags || [],
      sentimentScore: memoryData.sentimentScore,
      mediaUrl: memoryData.mediaUrl || null,
      imageSource: memoryData.imageSource || memoryData.photo || null,
      journeyType: memoryData.journeyType,
      domain: memoryData.domain
    });

    // Broadcast "memory_learned" event back to client socket
    const learnedEvent = {
      event: 'memory_learned',
      memoryId: ingestResult.memoryId,
      title: ingestResult.metadata.title,
      era: ingestResult.metadata.era,
      vectorDimension: ingestResult.vectorDimension,
      multimodal: ingestResult.multimodal,
      visualSummary: ingestResult.visualPerception?.visualSummary || null,
      resilienceScore: ingestResult.cognitiveLearning?.resilienceScore || 85,
      message: '⚡ Memory instant-learned with multimodal perception! Very next chat query will incorporate this play.'
    };

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(learnedEvent));
    }

    return learnedEvent;
  } catch (err) {
    console.error('Instant Learning Error:', err);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ event: 'error', message: 'Instant learning failed.' }));
    }
  }
}

/**
 * Processes Chat Flow with Phase 2 RAG, Phase 3 Prompting, Multimodal Vision, and Token Streaming
 */
export async function processStreamingChatFlow(ws, sessionState, userPrompt, selectedEra, imageSource = null, rawMemories = []) {
  // 1. Check Safety Guardrails (Severe Crisis / Despair)
  if (detectCrisisKeywords(userPrompt)) {
    const crisisText = `I hear how much pain you are in right now, and I want you to know that you are not alone. I'm stepping out of our younger self character because your safety and life matter deeply.\n\nPlease reach out for immediate support:\n• **988 Suicide & Crisis Lifeline**: Call or text **988** (24/7 free & confidential)\n• **Crisis Text Line**: Text **HOME** to **741741**\n• **Tele-MANAS**: Call **14416** or **1800 891 4416**\n\nPlease take a deep breath. We built this journey together, and your future still needs you.`;

    // Stream crisis response token by token
    const words = crisisText.split(' ');
    for (const word of words) {
      if (ws.readyState !== WebSocket.OPEN) break;
      ws.send(JSON.stringify({ event: 'token', data: word + ' ' }));
      await sleep(20);
    }

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        event: 'done',
        fullResponse: crisisText,
        insightQuote: 'Your safety and life matter deeply. Reach out for help.',
        crisisTriggered: true
      }));
    }
    return { fullResponse: crisisText, crisisTriggered: true };
  }

  // 2. Trigger Phase 2: Retrieve Era-Constrained RAG Context
  const ragContext = await retrieveEraContext({
    userId: sessionState.userId,
    selectedEra,
    userPrompt,
    topK: 4
  });

  // Parse structured memories from both vector RAG store and client timeline nodes
  const parsedMemories = parseMemoriesFromContext(ragContext, ragContext.formattedContext, rawMemories, selectedEra);
  let formattedContextChunks = ragContext.formattedContext || '';

  // If client nodes are available, format them so the younger self is grounded in authentic memories
  if (parsedMemories.length > 0 && (!formattedContextChunks || formattedContextChunks.includes("haven't logged any memories"))) {
    const formattedBlocks = parsedMemories.slice(0, 5).map((mem, i) => {
      const dateStr = mem.date || 'Date Unknown';
      const titleStr = mem.title || 'Milestone';
      const emotionStr = Array.isArray(mem.tags) ? mem.tags.join(', ') : (mem.tags || 'Reflective');
      const photoStr = mem.photo ? (mem.caption ? `"${mem.caption}" (${mem.photo})` : mem.photo) : null;
      let block = `### Memory ${i + 1}: ${titleStr}\n- **Date**: ${dateStr}\n- **Era**: ${mem.era || selectedEra}\n- **Emotions**: ${emotionStr}\n- **Journal Excerpt**: "${(mem.journal || '').slice(0, 250)}"`;
      if (typeof mem.sentiment === 'number') {
        const energyLabel = mem.sentiment >= 75 ? 'Joyful & Triumphant' : mem.sentiment >= 50 ? 'Grounded & Hopeful' : 'Tested & Resilient';
        block += `\n- **Emotional Energy**: ${energyLabel} (${mem.sentiment}/100)`;
      }
      if (photoStr) {
        block += `\n- **Photo Captured**: ${photoStr}`;
      }
      if (mem.domain) {
        block += `\n- **Domain**: ${mem.domain}`;
      }
      return block;
    });
    formattedContextChunks = formattedBlocks.join('\n\n');
  }

  // 3. Multimodal Perception for Chat Image (if imageSource provided)
  let normalizedChatImage = null;
  let chatImagePerception = null;
  if (imageSource) {
    try {
      normalizedChatImage = await normalizeImageSource(imageSource);
      chatImagePerception = await perceiveImage({
        imageSource,
        domain: sessionState.domain || 'football',
        era: selectedEra
      });
    } catch (visErr) {
      console.warn('WebSocket chat image perception warning:', visErr.message);
    }
  }

  // 4. Synthesize Continuous Learning Trajectory Insights
  const activeMemoriesList = parsedMemories.length > 0 ? parsedMemories : (ragContext.memories || []);
  const cognitiveInsights = synthesizeLearnedInsights({
    userId: sessionState.userId,
    era: selectedEra,
    domain: sessionState.domain || 'football',
    memories: activeMemoriesList
  });

  // 5. Construct System Prompt Contract with Cognitive Insights
  const eraAge = calculateEraAge(selectedEra);
  const systemPrompt = buildYoungerSelfSystemPrompt({
    selectedEra,
    eraAge,
    retrievedContextChunks: formattedContextChunks,
    cognitiveInsights
  });

  const apiKey = process.env.GEMINI_API_KEY;
  let fullResponse = '';

  // 6. Provider A: Google Gemini Real-Time Token Streaming API (@google/genai)
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const contents = [];
      
      if (sessionState.history && sessionState.history.length > 0) {
        sessionState.history.slice(-MAX_HISTORY_TURNS).forEach(item => {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.content || item.text || '' }]
          });
        });
      }

      const userParts = [];
      if (normalizedChatImage && normalizedChatImage.base64Data) {
        userParts.push({
          inlineData: {
            data: normalizedChatImage.base64Data,
            mimeType: normalizedChatImage.mimeType || 'image/jpeg'
          }
        });
      }
      const promptText = userPrompt || (chatImagePerception ? 'Look at this photo from our journey.' : '');
      if (promptText) userParts.push({ text: promptText });
      contents.push({ role: 'user', parts: userParts });

      const streamingResult = await ai.models.generateContentStream({
        model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
        contents,
        config: { systemInstruction: systemPrompt, temperature: 0.7 }
      });

      const streamIterable = streamingResult.stream || streamingResult;
      for await (const chunk of streamIterable) {
        const textChunk = chunk.text;
        if (textChunk) {
          fullResponse += textChunk;
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ event: 'token', data: textChunk }));
          }
        }
      }

      if (fullResponse) {
        // Record in history & enforce sliding window
        sessionState.history.push({ role: 'user', content: userPrompt });
        sessionState.history.push({ role: 'assistant', content: fullResponse });
        if (sessionState.history.length > MAX_HISTORY_TURNS * 2) {
          sessionState.history = sessionState.history.slice(-MAX_HISTORY_TURNS * 2);
        }

        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            event: 'done',
            fullResponse,
            insightQuote: extractInsightQuote(fullResponse),
            visualPerception: chatImagePerception || null
          }));
        }
        return { fullResponse, crisisTriggered: false };
      }
    } catch (err) {
      console.warn('Gemini Streaming warning, falling back:', err.message);
      // Tokens already streamed for a partial reply must not be repeated by a fallback provider
      if (fullResponse) {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({
            event: 'done',
            fullResponse,
            insightQuote: extractInsightQuote(fullResponse),
            visualPerception: chatImagePerception || null
          }));
        }
        return { fullResponse, crisisTriggered: false };
      }
    }
  }

  // 5. Provider B: Ollama Real-Time Token Streaming API
  try {
    const ollamaCheck = await fetch(`${OLLAMA_HOST}/api/tags`, { signal: AbortSignal.timeout(800) });
    if (ollamaCheck.ok) {
      const messages = [{ role: 'system', content: systemPrompt }];
      sessionState.history.slice(-MAX_HISTORY_TURNS).forEach(h => messages.push({ role: h.role === 'user' ? 'user' : 'assistant', content: h.content }));
      messages.push({ role: 'user', content: userPrompt });

      const res = await fetch(`${OLLAMA_HOST}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'llama3', messages, stream: true })
      });

      if (res.ok && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunkStr = decoder.decode(value, { stream: true });
          const lines = chunkStr.split('\n').filter(Boolean);
          
          for (const line of lines) {
            try {
              const parsed = JSON.parse(line);
              const textChunk = parsed.message?.content;
              if (textChunk) {
                fullResponse += textChunk;
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ event: 'token', data: textChunk }));
                }
              }
            } catch {}
          }
        }

        if (fullResponse) {
          sessionState.history.push({ role: 'user', content: userPrompt });
          sessionState.history.push({ role: 'assistant', content: fullResponse });
          if (sessionState.history.length > MAX_HISTORY_TURNS * 2) {
            sessionState.history = sessionState.history.slice(-MAX_HISTORY_TURNS * 2);
          }

          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              event: 'done',
              fullResponse,
              insightQuote: extractInsightQuote(fullResponse),
              visualPerception: chatImagePerception || null
            }));
          }
          return { fullResponse, crisisTriggered: false };
        }
      }
    }
  } catch (err) {
    // Local Ollama offline
  }

  // 7. Provider C: Dynamic Real-Time Typewriter Token Streaming Fallback
  const isBurnout = detectBurnoutKeywords(userPrompt);
  let fallbackReply = `Hey! Back in our ${selectedEra} (when we were ${eraAge}), we were grinding every single day. I remember how much heart we put into everything.`;

  if (chatImagePerception) {
    fallbackReply = `I remember that day so clearly! Looking at this photograph, I can see ${chatImagePerception.visualSummary} Looking back at our ${chatImagePerception.perceivedEmotions.slice(0, 2).join(' and ')} expression, it brings me right back to our ${selectedEra} days. Back when we were ${eraAge}, every single minute on the pitch meant everything to us!`;
  } else if (isBurnout) {
    fallbackReply = `Hey... take a deep breath. Look at how far we've come since ${selectedEra}! Back when we were ${eraAge}, we sacrificed so much sleep, sweat, and tears for this dream. Don't give up on us now—remember why we started!`;
  } else if (
    userPrompt.toLowerCase().includes('promotion') || 
    userPrompt.toLowerCase().includes('corporate') || 
    userPrompt.toLowerCase().includes('future') || 
    userPrompt.toLowerCase().includes('what happens next') || 
    userPrompt.toLowerCase().includes('job')
  ) {
    fallbackReply = `I don't remember that happening yet—did that happen after this season? Back here in ${selectedEra}, I can only see the challenges right in front of us!`;
  } else if (userPrompt.toLowerCase().includes('remember') || userPrompt.toLowerCase().includes('tell me about')) {
    fallbackReply = `Of course I remember! In ${selectedEra}, our days were filled with energy and high goals. Here is what stands out from our memories: \n\n${ragContext.formattedContext}`;
  }

  fullResponse = fallbackReply;
  const words = fullResponse.split(' ');

  for (const word of words) {
    if (ws.readyState !== WebSocket.OPEN) break;
    ws.send(JSON.stringify({ event: 'token', data: word + ' ' }));
    await sleep(25);
  }

  sessionState.history.push({ role: 'user', content: userPrompt });
  sessionState.history.push({ role: 'assistant', content: fullResponse });
  if (sessionState.history.length > MAX_HISTORY_TURNS * 2) {
    sessionState.history = sessionState.history.slice(-MAX_HISTORY_TURNS * 2);
  }

  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      event: 'done',
      fullResponse,
      insightQuote: extractInsightQuote(fullResponse),
      visualPerception: chatImagePerception || null
    }));
  }
  return { fullResponse, crisisTriggered: false };
}
