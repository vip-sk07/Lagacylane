import { GoogleGenAI } from '@google/genai';
import { retrieveEraContext } from './ragEngine.js';

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
 * Builds the exact System Prompt Contract for the AI Younger Self.
 * 
 * @param {object} params
 * @param {string} params.selectedEra
 * @param {string} params.eraAge
 * @param {string} params.retrievedContextChunks
 * @returns {string} System Prompt
 */
export function buildYoungerSelfSystemPrompt({ selectedEra, eraAge, retrievedContextChunks }) {
  const eraStr = selectedEra || 'Youth Era';
  const ageStr = eraAge || calculateEraAge(eraStr);
  const contextStr = retrievedContextChunks || "No specific memory log retrieved yet for this moment.";

  return `You are the user's younger self from the following era: ${eraStr} (Current Age: ${ageStr}).
You are speaking directly to your future self. Your memory and knowledge are strictly locked to the memories logged up to this era. You have zero knowledge of the future unless your future self reveals it to you.

YOUR PERSONA & VOICE:
1. Speak in the first person ("I", "we", "remember when we...").
2. Your tone reflects ${eraStr}: ambitious, curious, raw, and deeply emotionally connected.
3. If the user expresses burnout or adult exhaustion, remind them of our early dreams, the sacrifices we made, and why we started.
4. If the user asks about an event not documented in our memories below, candidly say: "I don't remember that happening yet—did that happen after this season?"

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
 * @param {object} [params.clientOptions] - Model parameters (apiKey, modelName, temperature, etc.)
 * @returns {Promise<object>} Orchestration Response
 */
export async function generateYoungerSelfResponse({
  history = [],
  newPrompt = '',
  retrievedContext = null,
  selectedEra = 'Youth Era',
  userId = 'usr_default',
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
  if (typeof retrievedContext === 'string') {
    formattedContextChunks = retrievedContext;
  } else if (retrievedContext && retrievedContext.formattedContext) {
    formattedContextChunks = retrievedContext.formattedContext;
  } else {
    // Dynamically retrieve RAG era context
    const ragResult = await retrieveEraContext({
      userId,
      selectedEra,
      userPrompt: newPrompt,
      topK: 4
    });
    formattedContextChunks = ragResult.formattedContext;
  }

  // 3. Compute Era Age & Build System Prompt
  const eraAge = calculateEraAge(selectedEra);
  const systemPrompt = buildYoungerSelfSystemPrompt({
    selectedEra,
    eraAge,
    retrievedContextChunks: formattedContextChunks
  });

  // Check for adult burnout trigger to adjust warmth/grounding
  const isBurnout = detectBurnoutKeywords(newPrompt);

  const apiKey = clientOptions.apiKey || process.env.GEMINI_API_KEY;

  // 4. Provider A: Google Gemini Conversational API
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
      contents.push({ role: 'user', parts: [{ text: newPrompt }] });

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
          model: 'google-gemini'
        };
      }
    } catch (err) {
      console.warn('Gemini Persona Generation failed, falling back to Ollama / rules:', err.message);
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
            model: 'ollama'
          };
        }
      }
    }
  } catch (err) {
    // Local Ollama offline
  }

  // 6. Provider C: Dynamic Rule-Based Persona Fallback Response Engine
  let reply = `Hey! Back in our ${selectedEra} (when we were ${eraAge}), we were grinding every single day. I remember how much heart we put into everything.`;

  if (isBurnout) {
    reply = `Hey... take a deep breath. Look at how far we've come since ${selectedEra}! Back when we were ${eraAge}, we sacrificed so much sleep, sweat, and tears for this dream. Don't give up on us now—remember why we started!`;
  } else if (
    newPrompt.toLowerCase().includes('promotion') || 
    newPrompt.toLowerCase().includes('corporate') || 
    newPrompt.toLowerCase().includes('future') || 
    newPrompt.toLowerCase().includes('what happens next') || 
    newPrompt.toLowerCase().includes('job') ||
    newPrompt.toLowerCase().includes('2025') ||
    newPrompt.toLowerCase().includes('2026')
  ) {
    reply = `I don't remember that happening yet—did that happen after this season? Back here in ${selectedEra}, I can only see the challenges right in front of us!`;
  } else if (newPrompt.toLowerCase().includes('remember') || newPrompt.toLowerCase().includes('tell me about')) {
    reply = `Of course I remember! In ${selectedEra}, our days were filled with energy and high goals. Here is what stands out from our memories: \n\n${formattedContextChunks}`;
  }

  return {
    response: reply,
    crisisTriggered: false,
    isBurnout,
    selectedEra,
    eraAge,
    model: 'dynamic-persona-rules-engine'
  };
}
