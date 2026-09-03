import { GoogleGenAI } from '@google/genai';
import crypto from 'crypto';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const EMBEDDING_DIMENSION = 768;

/**
 * Checks if local Ollama server is accessible.
 */
async function checkOllama() {
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/tags`, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Generates deterministic 768-dim normalized embedding fallback vector.
 * Used for offline development when neither Gemini API key nor local Ollama is available.
 * @param {string} text 
 * @returns {Array<number>} 768-length float array
 */
function generateDeterministicFallbackVector(text) {
  const hash = crypto.createHash('sha256').update(text).digest();
  const vector = new Array(EMBEDDING_DIMENSION);
  
  let norm = 0;
  for (let i = 0; i < EMBEDDING_DIMENSION; i++) {
    // Generate pseudo-random deterministic floats between -1 and 1
    const byte = hash[i % hash.length];
    const val = Math.sin((i + 1) * (byte + 1)) * Math.cos(text.length + i);
    vector[i] = val;
    norm += val * val;
  }

  // Normalize to unit length (L2 norm)
  norm = Math.sqrt(norm) || 1;
  return vector.map(v => parseFloat((v / norm).toFixed(6)));
}

/**
 * Modular Vector Embedding Generator
 * Supports:
 *  1. Google Gemini Embedding API (`text-embedding-004`) via `@google/genai`
 *  2. Local Ollama Fallback (`nomic-embed-text` or `all-minilm`)
 *  3. Deterministic Local Vector Math Fallback (offline mode)
 *
 * @param {string} text - Rich payload string to vectorize
 * @param {object} [options] - Configuration overrides
 * @returns {Promise<{ embedding: Array<number>, provider: string, dimension: number, zeroTrainingGuarantee: boolean }>}
 */
export async function generateEmbedding(text, options = {}) {
  const apiKey = options.apiKey || process.env.GEMINI_API_KEY;

  // ---------------------------------------------------------
  // Provider A: Google Gemini Embedding API (text-embedding-004)
  // ---------------------------------------------------------
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.embedContent({
        model: 'text-embedding-004',
        contents: text,
      });

      if (response && response.embedding && response.embedding.values) {
        let embeddingValues = response.embedding.values;

        // Ensure 768 dimensions
        if (embeddingValues.length !== EMBEDDING_DIMENSION) {
          console.warn(`Gemini returned ${embeddingValues.length}-dim vector, adjusting to ${EMBEDDING_DIMENSION}`);
          embeddingValues = adjustVectorDimension(embeddingValues, EMBEDDING_DIMENSION);
        }

        return {
          embedding: embeddingValues,
          provider: 'google-gemini (text-embedding-004)',
          dimension: EMBEDDING_DIMENSION,
          zeroTrainingGuarantee: true // Google API Commercial terms: Customer data is not used for model training
        };
      }
    } catch (err) {
      console.warn('Google Gemini Embedding API call failed, falling back to Ollama / local:', err.message);
    }
  }

  // ---------------------------------------------------------
  // Provider B: Local Ollama Fallback (nomic-embed-text / all-minilm)
  // ---------------------------------------------------------
  const isOllamaLive = await checkOllama();
  if (isOllamaLive) {
    const modelsToTry = ['nomic-embed-text', 'all-minilm', 'llama3'];
    for (const model of modelsToTry) {
      try {
        const response = await fetch(`${OLLAMA_HOST}/api/embeddings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, prompt: text })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.embedding && Array.isArray(data.embedding)) {
            const adjustedVector = adjustVectorDimension(data.embedding, EMBEDDING_DIMENSION);
            return {
              embedding: adjustedVector,
              provider: `ollama (${model})`,
              dimension: EMBEDDING_DIMENSION,
              zeroTrainingGuarantee: true // Local LLM runs entirely on-device; zero data leaves local machine
            };
          }
        }
      } catch (err) {
        // Try next model
      }
    }
  }

  // ---------------------------------------------------------
  // Provider C: Offline Deterministic Vector Fallback
  // ---------------------------------------------------------
  const fallbackVector = generateDeterministicFallbackVector(text);
  return {
    embedding: fallbackVector,
    provider: 'local-fallback (deterministic vector math)',
    dimension: EMBEDDING_DIMENSION,
    zeroTrainingGuarantee: true
  };
}

/**
 * Resizes or pads/truncates a vector to match required target dimensions.
 */
function adjustVectorDimension(vector, targetDim) {
  if (vector.length === targetDim) return vector;
  if (vector.length > targetDim) return vector.slice(0, targetDim);

  const padded = [...vector];
  while (padded.length < targetDim) {
    padded.push(0.0);
  }
  return padded;
}
