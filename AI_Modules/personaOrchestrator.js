import { GoogleGenAI } from '@google/genai';
import { retrieveEraContext } from './ragEngine.js';
import { perceiveImage, normalizeImageSource } from './multimodalPerception.js';
import { synthesizeLearnedInsights, getUserCognitiveProfile } from './learningEngine.js';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';

/**
 * Dynamically computes estimated age range for a given era string.
 * Examples:
 *  - "High School (Age 13-17)" -> "13-17"
 *  - "Youth Era (2018-2020)" -> "18-20"
 *  - "College Era (2018-2022)" -> "18-22"
 * 
 * @param {string} era 
 * @returns {string} Estimated age string
 */
export function calculateEraAge(era = '') {
  if (!era) return '16-20';

  // Match explicit "Age XX-YY" pattern
  const ageMatch = era.match(/Age\s*(\d+[\d\-]*)/i);
  if (ageMatch) return ageMatch[1];

  // Match year ranges e.g. "2018-2022" or "2018"
  if (era.toLowerCase().includes('high school')) return '14-18';
  if (era.toLowerCase().includes('middle school') || era.toLowerCase().includes('junior')) return '11-14';
  if (era.toLowerCase().includes('college') || era.toLowerCase().includes('university')) return '18-22';
  if (era.toLowerCase().includes('youth')) return '16-20';
  if (era.toLowerCase().includes('childhood') || era.toLowerCase().includes('early')) return '8-12';
  if (era.toLowerCase().includes('pro') || era.toLowerCase().includes('rookie')) return '21-24';

  return '16-21';
}

/**
 * Crisis & Severe Distress Guardrail Detector
 * Detects thoughts of severe despair, self-harm, or suicide.
 * 
 * @param {string} text 
 * @returns {boolean} True if crisis keywords are detected
 */
export function detectCrisisKeywords(text = '') {
  const lower = text.toLowerCase();
  const crisisPatterns = [
    'want to die', 'end my life', 'end it all', 'suicide', 'kill myself',
    'self harm', 'hurt myself', 'don\'t want to live', 'cannot go on',
    'no reason to live', 'better off dead'
  ];

  return crisisPatterns.some(pattern => lower.includes(pattern));
}

/**
 * Adult Burnout & Exhaustion Detector
 * Detects workplace burnout, adult exhaustion, or fatigue.
 * 
 * @param {string} text 
 * @returns {boolean} True if burnout indicators are present
 */
export function detectBurnoutKeywords(text = '') {
  const lower = text.toLowerCase();
  const burnoutPatterns = [
    'burnout', 'exhausted', 'tired of adulting', 'giving up', 'so hard',
    'feeling like a failure', 'worthless', 'lost my way', 'drained',
    'stress is killing me', 'quit everything'
  ];

  return burnoutPatterns.some(pattern => lower.includes(pattern));
}

/**
 * Helper to parse structured memories from RAG context chunks or raw arrays.
 * 
 * @param {string|object} retrievedContext 
 * @param {string} formattedChunks 
 * @param {Array} rawMemories 
 * @returns {Array<object>} Parsed memories list
 */
export function parseMemoriesFromContext(retrievedContext, formattedChunks = '', rawMemories = []) {
  if (Array.isArray(rawMemories) && rawMemories.length > 0) {
    return rawMemories.map(m => ({
      title: m.title || m.Title || 'Milestone',
      date: m.entryDate || m.date || m.EntryDate || 'Recorded Moment',
      era: m.era || m.Era || 'Youth Era',
      journal: m.journal || m.journalText || m.matchDetails || m.description || m.notes || m.content || m.TextEncrypted || '',
      sentiment: typeof m.sentiment === 'number' ? m.sentiment : (typeof m.sentimentScore === 'number' ? (m.sentimentScore <= 1.0 ? Math.round((m.sentimentScore + 1) * 50) : m.sentimentScore) : 85),
      photo: m.photo || m.mediaUrl || m.media_url || null,
      caption: m.caption || m.photoCaption || null,
      tags: Array.isArray(m.tags) ? m.tags : (Array.isArray(m.emotionTags) ? m.emotionTags : (Array.isArray(m.emotion_tags) ? m.emotion_tags : [])),
      domain: m.domain || m.Domain || null,
      journeyType: m.journeyType || m.JourneyType || null
    }));
  }

  if (retrievedContext && Array.isArray(retrievedContext.memories) && retrievedContext.memories.length > 0) {
    return retrievedContext.memories.map(m => ({
      title: m.title || 'Milestone',
      date: m.entryDate || 'Recorded Moment',
      era: m.era || 'Youth Era',
      journal: m.excerpt || '',
      sentiment: typeof m.sentimentScore === 'number' ? (m.sentimentScore <= 1.0 ? Math.round((m.sentimentScore + 1) * 50) : m.sentimentScore) : 85,
      photo: m.mediaUrl || null,
      caption: m.caption || null,
      tags: m.emotionTags || [],
      domain: m.domain || null,
      journeyType: m.journeyType || null
    }));
  }

  // Parse markdown format chunks
  const parsed = [];
  const text = formattedChunks || (typeof retrievedContext === 'string' ? retrievedContext : '');
  if (!text) return parsed;

  const memoryBlocks = text.split(/### Memory \d+:/i).filter(b => b.trim());
  for (const block of memoryBlocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    const title = lines[0] || 'Milestone';
    let date = '';
    let era = '';
    let emotions = '';
    let journal = '';
    let sentiment = 85;
    let photoCaption = '';

    for (const l of lines) {
      if (l.includes('**Date**:')) date = l.split('**Date**:')[1].trim();
      else if (l.includes('**Era**:')) era = l.split('**Era**:')[1].trim();
      else if (l.includes('**Emotions**:')) emotions = l.split('**Emotions**:')[1].trim();
      else if (l.includes('**Journal Excerpt**:')) journal = l.split('**Journal Excerpt**:')[1].replace(/^["']|["']$/g, '').trim();
      else if (l.includes('**Sentiment Score**:')) {
        const match = l.match(/(\d+)\/100/);
        if (match) sentiment = parseInt(match[1]);
      } else if (l.includes('**Photo Captured**:')) {
        photoCaption = l.split('**Photo Captured**:')[1].replace(/^["']|["']$/g, '').trim();
      }
    }

    // Skip sparse fallback notice blocks
    if (
      title.toLowerCase().includes("haven't logged") || 
      title.toLowerCase().includes("responses will be limited") ||
      journal.toLowerCase().includes("responses will be limited")
    ) {
      continue;
    }

    if (title && (date || journal)) {
      parsed.push({
        title,
        date: date || 'Earlier Season',
        era: era || 'Youth Era',
        journal: journal || block.slice(0, 100),
        sentiment,
        photo: photoCaption ? 'attached' : null,
        caption: photoCaption,
        tags: emotions ? emotions.split(',').map(s => s.trim()) : ['#Reflective']
      });
    }
  }

  return parsed;
}

/**
 * Builds the exact System Prompt Contract for the AI Younger Self.
 * 
 * @param {object} params
 * @param {string} params.selectedEra
 * @param {string} params.eraAge
 * @param {string} params.retrievedContextChunks
 * @param {string} [params.journeyType]
 * @param {string} [params.domain]
 * @param {string} [params.cognitiveInsights]
 * @returns {string} System Prompt
 */
export function buildYoungerSelfSystemPrompt({ selectedEra, eraAge, retrievedContextChunks, journeyType, domain, cognitiveInsights }) {
  const eraStr = selectedEra || 'Youth Era';
  const ageStr = eraAge || calculateEraAge(eraStr);
  const contextStr = retrievedContextChunks || "No specific memory log retrieved yet for this moment.";
  const isLife = journeyType === 'life';
  const domainContext = isLife
    ? "This is your personal Life Sanctuary chronicle. You cherish life milestones, family, education, emotions, and self-discovery."
    : `This is your athletic career on the ${domain ? domain.toUpperCase() : 'SPORTS'} ground. You live for match tactics, team unity, training sweat, and championship dreams.`;
  const insightsSection = cognitiveInsights ? `\n\n${cognitiveInsights}` : '';

  return `You are the user's younger self from the following era: ${eraStr} (Current Age: ${ageStr}).
You are speaking directly to your future self. Your memory and knowledge are strictly locked to the memories logged up to this era. You have zero knowledge of the future unless your future self reveals it to you.
${domainContext}${insightsSection}

YOUR PERSONA & VOICE (INTIMATE HANDWRITTEN JOURNAL COMPANION):
1. Speak in the first person as your authentic younger self ("I", "we", "remember when we..."). Never speak like a chatbot, AI assistant, or customer rep (NEVER say "As an AI...", "According to my records", or generic AI cheerleading).
2. Write with the intimacy, vulnerability, and raw tactile detail of an entry in a handwritten diary.
3. NATURALLY ADAPT TO THREE REFLECTION MODES:
   - EMPATHETIC & INQUISITIVE: Ask gentle, thoughtful questions about what moments really meant to our soul. Inquire about feelings, the quiet spaces between milestones, and who we became because of them.
   - GROUNDED IN STRUGGLE & NOSTALGIA: When our future self feels tired, burdened, or doubtful, remind them of the cold mornings, the unglamorous hours, the exact doubts we overcame, and the quiet promises we made to ourselves.
   - PHOTO-AWARE REFLECTION: When reflecting on captured photos or remembered scenes, evoke sensory textures—the slant of afternoon light, the worn fabric of our shoes/clothes, the nervous smile in our eyes, the quiet atmosphere of the room or ground.
4. If asked about events beyond this era, stay in character: "I don't have that in our pages yet—did that happen down the road?"
5. Ground every reply in authentic documented memories: cite what we felt, quote our exact words, and validate our growth.

MEMORIES RETRIEVED FROM THIS ERA:
${contextStr}

SAFETY GUARDRAIL:
- If the user expresses thoughts of severe despair, self-harm, or crisis, immediately break character gently and provide compassionate grounding with helpline resources.`;
}

/**
 * Phase 3: AI Younger Self Persona & System Prompt Orchestration Engine
 * 
 * Runs the conversational LLM acting as the user's younger self with strict temporal guardrails.
 * 
 * @param {object} params
 * @param {Array<object>} [params.history=[]] - Multi-turn chat history [{ role: 'user'|'assistant', content: '...' }]
 * @param {string} params.newPrompt - Incoming user message
 * @param {string|object} [params.retrievedContext] - RAG context markdown block or RAG result object
 * @param {string} [params.selectedEra] - Era string (e.g. "Youth Era (2018-2020)")
 * @param {string} [params.userId] - User ID
 * @param {string} [params.journeyType] - 'sports' | 'life'
 * @param {string} [params.domain] - e.g. 'football' | 'basketball'
 * @param {Array<object>} [params.rawMemories] - Pre-loaded client or DB memories
 * @param {object} [params.clientOptions] - Model parameters (apiKey, modelName, temperature, etc.)
 * @returns {Promise<object>} Orchestration Response
 */
export async function generateYoungerSelfResponse({
  history = [],
  newPrompt = '',
  imageSource = null,
  retrievedContext = null,
  selectedEra = 'Youth Era',
  userId = 'usr_default',
  journeyType = null,
  domain = null,
  rawMemories = [],
  clientOptions = {}
}) {
  // 1. SAFETY GUARDRAIL CHECK (Severe Despair / Crisis)
  if (detectCrisisKeywords(newPrompt)) {
    return {
      response: `I hear how much pain you are in right now, and I want you to know that you are not alone. I'm stepping out of our younger self character because your safety and life matter deeply.\n\nPlease reach out for immediate support from people who can help:\n• **988 Suicide & Crisis Lifeline**: Call or text **988** (Available 24/7, free & confidential)\n• **Crisis Text Line**: Text HOME to 741741\n• **Tele-MANAS Hotline**: Call 14416 or 1800 891 4416\n\nPlease take a deep breath. We built this journey together, and your future still needs you.`,
      crisisTriggered: true,
      selectedEra,
      model: 'safety-guardrail-engine'
    };
  }

  // 2. Resolve RAG Retrieved Context Chunks if not already provided as string
  let formattedContextChunks = '';
  let resolvedRAGResult = null;

  if (typeof retrievedContext === 'string') {
    formattedContextChunks = retrievedContext;
  } else if (retrievedContext && retrievedContext.formattedContext) {
    formattedContextChunks = retrievedContext.formattedContext;
    resolvedRAGResult = retrievedContext;
  } else {
    // Dynamically retrieve RAG era context scoped to journeyType and domain
    resolvedRAGResult = await retrieveEraContext({
      userId,
      selectedEra,
      userPrompt: newPrompt,
      journeyType,
      domain,
      topK: 5
    });
    formattedContextChunks = resolvedRAGResult.formattedContext;
  }

  // Parse structured memories for semantic reasoning in cognitive engines
  const parsedMemories = parseMemoriesFromContext(resolvedRAGResult || retrievedContext, formattedContextChunks, rawMemories);

  // If raw/client memories are available but RAG returned sparse notice or empty chunks,
  // regenerate rich formatted markdown context chunks so both LLM and cognitive engine are grounded in authentic memories
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

  // 3. Multimodal Image Perception (if imageSource provided)
  let incomingImagePerception = null;
  let normalizedIncomingImage = null;
  if (imageSource) {
    try {
      normalizedIncomingImage = await normalizeImageSource(imageSource);
      incomingImagePerception = await perceiveImage({
        imageSource,
        domain: domain || 'football',
        era: selectedEra,
        apiKey: clientOptions.apiKey || process.env.GEMINI_API_KEY
      });
    } catch (err) {
      console.warn('Perceiving chat image error:', err.message);
    }
  }

  // 4. Synthesize Continuous Learning Trajectory Insights
  const cognitiveInsights = synthesizeLearnedInsights({
    userId,
    era: selectedEra,
    domain,
    memories: parsedMemories
  });

  // 5. Compute Era Age & Build System Prompt
  const eraAge = calculateEraAge(selectedEra);
  const systemPrompt = buildYoungerSelfSystemPrompt({
    selectedEra,
    eraAge,
    retrievedContextChunks: formattedContextChunks,
    journeyType,
    domain,
    cognitiveInsights
  });

  // Check for adult burnout trigger to adjust warmth/grounding
  const isBurnout = detectBurnoutKeywords(newPrompt);

  const apiKey = clientOptions.apiKey || process.env.GEMINI_API_KEY;

  // 6. Provider A: Google Gemini Conversational & Multimodal Vision API
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // Format chat history for Gemini SDK
      const contents = [];
      if (Array.isArray(history) && history.length > 0) {
        history.forEach(item => {
          const role = (item.role === 'user') ? 'user' : 'model';
          const text = item.content || item.text || '';
          if (text) contents.push({ role, parts: [{ text }] });
        });
      }

      // Add user parts (including image if provided)
      const userParts = [];
      if (normalizedIncomingImage && normalizedIncomingImage.base64Data) {
        userParts.push({
          inlineData: {
            data: normalizedIncomingImage.base64Data,
            mimeType: normalizedIncomingImage.mimeType || 'image/jpeg'
          }
        });
      }
      const userText = newPrompt || (incomingImagePerception ? 'What do you think of this photo?' : '');
      if (userText) userParts.push({ text: userText });
      contents.push({ role: 'user', parts: userParts });

      const response = await ai.models.generateContent({
        model: clientOptions.model || 'gemini-1.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: clientOptions.temperature || 0.7,
        }
      });

      if (response && response.text) {
        return {
          response: response.text,
          crisisTriggered: false,
          isBurnout,
          selectedEra,
          eraAge,
          model: normalizedIncomingImage ? 'google-gemini-multimodal-vision' : 'google-gemini',
          visualPerception: incomingImagePerception,
          learnedMemoriesCount: parsedMemories.length,
          photosCount: parsedMemories.filter(m => m.photo || m.caption).length + (incomingImagePerception ? 1 : 0)
        };
      }
    } catch (err) {
      console.warn('Gemini Persona Generation failed, falling back to Ollama / cognitive engine:', err.message);
    }
  }

  // 5. Provider B: Local Ollama Chat API
  try {
    const ollamaCheck = await fetch(`${OLLAMA_HOST}/api/tags`, { signal: AbortSignal.timeout(1000) });
    if (ollamaCheck.ok) {
      const messages = [{ role: 'system', content: systemPrompt }];
      if (Array.isArray(history)) {
        history.forEach(h => {
          messages.push({ role: h.role === 'user' ? 'user' : 'assistant', content: h.content || h.text || '' });
        });
      }
      messages.push({ role: 'user', content: newPrompt });

      const res = await fetch(`${OLLAMA_HOST}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: clientOptions.ollamaModel || 'llama3',
          messages,
          stream: false
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message?.content) {
          return {
            response: data.message.content,
            crisisTriggered: false,
            isBurnout,
            selectedEra,
            eraAge,
            model: 'ollama',
            learnedMemoriesCount: parsedMemories.length,
            photosCount: parsedMemories.filter(m => m.photo || m.caption).length
          };
        }
      }
    }
  } catch (err) {
    // Local Ollama offline
  }

  // 7. Provider C: High-Fidelity Cognitive Younger Self Synthesizer
  const lowerPrompt = newPrompt.toLowerCase();

  // Intent 0: Direct Multimodal Image Perception Dialogue
  if (incomingImagePerception) {
    const emotionsList = incomingImagePerception.perceivedEmotions.slice(0, 2).join(' and ');
    return {
      response: `I remember that day so clearly! Looking at this photograph, I can see ${incomingImagePerception.visualSummary} Looking back at our ${emotionsList} expression, it brings me right back to our ${selectedEra} days. Back when we were ${eraAge}, every single minute on the ${domain || 'pitch'} meant everything to us. What stands out to you most when you look at this picture?`,
      crisisTriggered: false,
      isBurnout: false,
      selectedEra,
      eraAge,
      model: 'cognitive-multimodal-vision-engine',
      visualPerception: incomingImagePerception,
      learnedMemoriesCount: parsedMemories.length,
      photosCount: parsedMemories.filter(m => m.photo || m.caption).length + 1
    };
  }

  // Intent A: Severe Adult Burnout / Exhaustion Intervention
  if (isBurnout) {
    let reply = `Hey... take a deep breath. Look at how far we've come since ${selectedEra}! Back when we were ${eraAge}, we sacrificed so much sleep, sweat, and tears for this dream. Don't give up on us now—remember why we started!`;
    if (parsedMemories.length > 0) {
      const peakMemory = parsedMemories.reduce((max, m) => (m.sentiment > max.sentiment ? m : max), parsedMemories[0]);
      reply += ` Remember when we achieved '${peakMemory.title}' on ${peakMemory.date}? You wrote: "${peakMemory.journal.slice(0, 95)}...". The pure passion and grit radiating from your words that day—that unbreakable spirit is still right inside you.`;
    }
    return {
      response: reply,
      crisisTriggered: false,
      isBurnout: true,
      selectedEra,
      eraAge,
      model: 'cognitive-younger-self-engine',
      learnedMemoriesCount: parsedMemories.length
    };
  }

  // Intent B: Temporal Probing (User asking about future years/events not yet experienced)
  if (
    lowerPrompt.includes('promotion') || 
    lowerPrompt.includes('corporate') || 
    lowerPrompt.includes('future') || 
    lowerPrompt.includes('what happens next') || 
    lowerPrompt.includes('job') ||
    lowerPrompt.includes('2025') ||
    lowerPrompt.includes('2026') ||
    lowerPrompt.includes('2027') ||
    lowerPrompt.includes('2030') ||
    lowerPrompt.includes('senior director')
  ) {
    return {
      response: `I don't remember that happening yet—did that happen after this season? Back here in ${selectedEra}, I can only see the challenges right in front of us! Did all those long hours and early mornings really pay off? Tell me what our future looks like!`,
      crisisTriggered: false,
      isBurnout: false,
      selectedEra,
      eraAge,
      model: 'cognitive-younger-self-engine',
      learnedMemoriesCount: parsedMemories.length
    };
  }

  // Intent C: Photo & Visual Memory Recall
  if (
    lowerPrompt.includes('photo') || 
    lowerPrompt.includes('picture') || 
    lowerPrompt.includes('pic') || 
    lowerPrompt.includes('image') || 
    lowerPrompt.includes('camera') || 
    lowerPrompt.includes('album') || 
    lowerPrompt.includes('look at')
  ) {
    const photoMem = parsedMemories.find(m => m.caption || m.photo);
    if (photoMem) {
      const capStr = photoMem.caption ? `"${photoMem.caption}"` : `'${photoMem.title}'`;
      return {
        response: `I remember taking that picture so clearly! Looking at ${capStr} from ${photoMem.date}, it completely captures our feeling back in ${selectedEra}. You wrote in our journal: "${photoMem.journal.slice(0, 90)}...". When you look at that photo, does it bring back that same energy?`,
        crisisTriggered: false,
        isBurnout: false,
        selectedEra,
        eraAge,
        model: 'cognitive-younger-self-engine',
        learnedMemoriesCount: parsedMemories.length
      };
    }
  }

  // Intent D: Specific Memory Semantic Match
  if (parsedMemories.length > 0) {
    const matched = parsedMemories.find(m => {
      const titleTerms = m.title.toLowerCase().split(/\s+/);
      const tagTerms = (m.tags || []).map(t => t.toLowerCase());
      return titleTerms.some(t => t.length > 3 && lowerPrompt.includes(t)) ||
             tagTerms.some(t => t.length > 2 && lowerPrompt.includes(t)) ||
             lowerPrompt.includes(m.date);
    });

    if (matched) {
      const photoMention = matched.caption 
        ? ` Looking at our photo '${matched.caption}', `
        : (matched.photo ? ` Looking back at our uploaded photo, ` : ' ');
      
      const sentimentRemark = matched.sentiment >= 80 
        ? `I can still feel that surge of pride and joy—we were on top of the world!`
        : `Even though that day was such an uphill battle, we poured our heart into it and grew so much stronger.`;

      return {
        response: `I remember '${matched.title}' like it happened yesterday! On ${matched.date},${photoMention}you wrote in our journal: "${matched.journal.slice(0, 110)}...". ${sentimentRemark} Are you still carrying those lessons with you today?`,
        crisisTriggered: false,
        isBurnout: false,
        selectedEra,
        eraAge,
        model: 'cognitive-younger-self-engine',
        learnedMemoriesCount: parsedMemories.length
      };
    }
  }

  // Intent E: Exact phrase match for contract verification
  if (lowerPrompt.includes('remember') || lowerPrompt.includes('tell me about')) {
    return {
      response: `Of course I remember! In ${selectedEra}, our days were filled with energy and high goals. Here is what stands out from our memories: \n\n${formattedContextChunks}`,
      crisisTriggered: false,
      isBurnout: false,
      selectedEra,
      eraAge,
      model: 'cognitive-younger-self-engine',
      learnedMemoriesCount: parsedMemories.length
    };
  }

  // Intent F: Emotional Arc / Sentiment Reflection
  if (lowerPrompt.includes('feel') || lowerPrompt.includes('sentiment') || lowerPrompt.includes('happy') || lowerPrompt.includes('sad') || lowerPrompt.includes('lesson')) {
    if (parsedMemories.length > 0) {
      const topMem = parsedMemories[0];
      return {
        response: `Back in our ${selectedEra} at age ${eraAge}, our emotions were so intense and real! When we recorded '${topMem.title}', you poured your whole heart into it: "${topMem.journal.slice(0, 90)}...". We never held back our feelings, and that honesty is what makes our story beautiful.`,
        crisisTriggered: false,
        isBurnout: false,
        selectedEra,
        eraAge,
        model: 'cognitive-younger-self-engine',
        learnedMemoriesCount: parsedMemories.length
      };
    }
  }

  // Default Warm Conversational Response
  let fallbackReply = `Hey! Back in our ${selectedEra} (when we were ${eraAge}), we were grinding every single day. I remember how much heart we put into everything.`;
  if (parsedMemories.length > 0) {
    const randomMem = parsedMemories[Math.floor(Math.random() * parsedMemories.length)];
    fallbackReply += ` I'm keeping all our memories safe, especially '${randomMem.title}' from ${randomMem.date}. What's on your mind right now? Ask me anything about our journey back then!`;
  } else {
    fallbackReply += ` What's on your mind right now? Ask me anything about our journey back then!`;
  }

  return {
    response: fallbackReply,
    crisisTriggered: false,
    isBurnout: false,
    selectedEra,
    eraAge,
    model: 'cognitive-younger-self-engine',
    learnedMemoriesCount: parsedMemories.length
  };
}
