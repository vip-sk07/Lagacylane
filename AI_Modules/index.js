/**
 * AI Modules - Persona & Sentiment Analysis Engine + Memory Vector Pipeline + RAG Engine + Persona Orchestrator + Sideline WebSocket Server
 * Connects to local Ollama (llama3 / qwen2.5), Google Gemini (text-embedding-004 / gemini-1.5-flash) or provides rules-based fallbacks.
 * Handles vector embedding generation, AES-256 memory encryption, Era-Filtered RAG retrieval, Persona Orchestration, and WebSocket Token Streaming.
 */

import { generateYoungerSelfResponse } from './personaOrchestrator.js';

// Re-export vector embedding, encryption, vector storage, ingestion service, RAG, Persona Orchestrator & WebSocket modules
export { generateEmbedding } from './embeddings.js';
export { encryptText, decryptText } from './encryption.js';
export { storeVectorEmbedding, searchVectorStore, getSupabaseSchemaSQL, cosineSimilarity } from './vectorStore.js';
export { formatEmbeddingPayload, ingestMemoryPayload, searchMemoriesByQuery } from './ingestionService.js';
export { retrieveEraContext, estimateTokens } from './ragEngine.js';
export { 
  generateYoungerSelfResponse, 
  buildYoungerSelfSystemPrompt, 
  calculateEraAge, 
  detectCrisisKeywords, 
  detectBurnoutKeywords 
} from './personaOrchestrator.js';
export { initSidelineWebSocketServer, handleInstantLearningEvent, processStreamingChatFlow } from './sidelineSocket.js';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';

/**
 * Checks if local Ollama server is running.
 */
export async function checkOllamaStatus() {
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/tags`);
    return res.ok;
  } catch (err) {
    return false;
  }
}

/**
 * Generates an Era-Grounded AI Younger Self Response using Phase 3 Persona Orchestrator.
 * 
 * @param {string} era - E.g. "Youth Era (2018-2020)"
 * @param {Array|string} memories - Array of memories matching this era or RAG context string
 * @param {string} userMessage - User's chat message
 * @param {Array} [history=[]] - Multi-turn chat history
 */
export async function generatePersonaResponse(era, memories, userMessage, history = []) {
  const result = await generateYoungerSelfResponse({
    history,
    newPrompt: userMessage,
    retrievedContext: memories,
    selectedEra: era
  });

  return result.response;
}

/**
 * Dynamically calculates sentiment score (-1 to 1) based on victory triggers.
 * @param {string} title
 * @param {string} content
 */
export function analyzeSentiment(title, content) {
  const text = ((title || '') + ' ' + (content || '')).toLowerCase();
  let score = 0.5; // neutral-positive default

  // Positive Triggers
  if (text.includes('win') || text.includes('victory') || text.includes('gold') || text.includes('trophy') || text.includes('champion')) {
    score += 0.45;
  }
  if (text.includes('hattrick') || text.includes('goal') || text.includes('century') || text.includes('mvp')) {
    score += 0.35;
  }
  // Negative Triggers
  if (text.includes('injury') || text.includes('acl') || text.includes('tear') || text.includes('hurt') || text.includes('defeat')) {
    score -= 0.85;
  }
  if (text.includes('struggle') || text.includes('dark') || text.includes('sad') || text.includes('pain')) {
    score -= 0.4;
  }

  return Math.min(Math.max(score, -1.0), 1.0);
}
