import { generateEmbedding } from './embeddings.js';
import { decryptText } from './encryption.js';
import { searchVectorStore, cosineSimilarity } from './vectorStore.js';

// Approximate token estimator (1 token ~ 4 characters in English)
const MAX_TOKEN_BUDGET = 800; // Max token budget for RAG context window
const MAX_CHAR_BUDGET = MAX_TOKEN_BUDGET * 4; // ~3200 characters

/**
 * Estimates token count for a given text string.
 * @param {string} text 
 * @returns {number} Estimated token count
 */
export function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

/**
 * Compresses/truncates text to fit within a character limit while preserving key sentence structure.
 * @param {string} text 
 * @param {number} maxChars 
 * @returns {string} Compressed text snippet
 */
function compressText(text, maxChars = 300) {
  if (!text || text.length <= maxChars) return text || '';
  
  // Truncate at sentence or word boundary
  const truncated = text.substring(0, maxChars);
  const lastPeriod = truncated.lastIndexOf('.');
  if (lastPeriod > maxChars * 0.6) {
    return truncated.substring(0, lastPeriod + 1) + '...';
  }
  return truncated.trim() + '...';
}

/**
 * Phase 2: Era-Filtered Hybrid RAG Engine
 * 
 * Executes an era-constrained semantic retrieval pipeline:
 *  1. Hard Metadata Filtering (Stage 1): Filters strictly by userId AND selectedEra.
 *     Ensures ZERO context bleeding from other eras/years.
 *  2. Vector Similarity Matching (Stage 2): Vectorizes userPrompt & computes Cosine Similarity.
 *  3. Fallback Handling: Returns sparse-data warning if zero memories match the era.
 *  4. Token-Budgeted Context Compression: Formats into condensed markdown (< 800 tokens).
 * 
 * @param {object} params
 * @param {string} params.userId - User ID
 * @param {string} params.selectedEra - Selected Era string (e.g., "Youth Era (2018-2020)")
 * @param {string} params.userPrompt - Input prompt from user
 * @param {number} [params.topK=4] - Max entries to retrieve (3 to 5)
 * @returns {Promise<object>} RAG Context Result payload
 */
export async function retrieveEraContext({ userId, selectedEra, userPrompt, topK = 4 }) {
  const fallbackResponse = {
    isSparse: true,
    count: 0,
    selectedEra,
    fallbackMessage: "You haven't logged any memories from this time yet. Responses will be limited.",
    formattedContext: "You haven't logged any memories from this time yet. Responses will be limited.",
    memories: [],
    tokenEstimate: estimateTokens("You haven't logged any memories from this time yet. Responses will be limited.")
  };

  if (!userId || !selectedEra) {
    return fallbackResponse;
  }

  // -------------------------------------------------------------
  // STAGE 1: Hard Metadata Filtering (userId = :userId AND era = :selectedEra)
  // Under NO circumstances may memories from future/other eras be retrieved.
  // -------------------------------------------------------------
  const stage1Filters = {
    userId: userId,
    era: selectedEra
  };

  // Perform search with zero prompt first to retrieve all candidates for Stage 1 check
  // or retrieve using user prompt embedding directly against filtered candidates
  const promptEmbedding = userPrompt ? await generateEmbedding(userPrompt) : null;
  const queryVector = promptEmbedding ? promptEmbedding.embedding : null;

  // Retrieve raw candidate pool matching hard metadata filters
  let candidatePool = await searchVectorStore(queryVector || new Array(768).fill(0), stage1Filters, 100);

  // Filter out any entries that do not strictly match selectedEra (hard boundary protection)
  candidatePool = candidatePool.filter(mem => mem.era === selectedEra);

  // STAGE 3 CHECK: Fallback for Sparse Data
  if (!candidatePool || candidatePool.length === 0) {
    return fallbackResponse;
  }

  // -------------------------------------------------------------
  // STAGE 2: Vector Similarity Retrieval & Ranking
  // -------------------------------------------------------------
  let rankedMemories = candidatePool;
  if (queryVector) {
    // If searchVectorStore didn't already score with the exact query vector, re-score
    rankedMemories = candidatePool.map(mem => {
      // Decrypt journal content if encrypted
      const decryptedText = decryptText(mem.encryptedText);
      return {
        ...mem,
        decryptedContent: decryptedText
      };
    });

    rankedMemories.sort((a, b) => b.similarity - a.similarity);
  } else {
    rankedMemories = candidatePool.map(mem => ({
      ...mem,
      decryptedContent: decryptText(mem.encryptedText)
    }));
  }

  // Select Top K (3 to 5 entries, default topK = 4)
  const topMemories = rankedMemories.slice(0, topK);

  // -------------------------------------------------------------
  // STAGE 4: Context Summarization & Token Budgeting (Max 800 Tokens)
  // -------------------------------------------------------------
  let formattedBlocks = [];
  let currentLength = 0;

  for (let i = 0; i < topMemories.length; i++) {
    const mem = topMemories[i];
    const dateStr = mem.entryDate || 'Date Unknown';
    const titleStr = mem.title || 'Untitled Memory';
    const emotionStr = Array.isArray(mem.emotion_tags) ? mem.emotion_tags.join(', ') : (mem.emotion_tags || 'Reflective');
    
    // Estimate allowable space per memory entry to guarantee max 800 tokens
    const maxExcerptChars = Math.floor((MAX_CHAR_BUDGET - 200) / topMemories.length);
    const compressedExcerpt = compressText(mem.decryptedContent, Math.min(maxExcerptChars, 400));

    const block = `### Memory ${i + 1}: ${titleStr}\n- **Date**: ${dateStr}\n- **Era**: ${mem.era}\n- **Emotions**: ${emotionStr}\n- **Journal Excerpt**: "${compressedExcerpt}"\n`;
    
    if (currentLength + block.length > MAX_CHAR_BUDGET) {
      // Truncate block to strictly fit within token budget
      const remainingSpace = MAX_CHAR_BUDGET - currentLength;
      if (remainingSpace > 50) {
        formattedBlocks.push(compressText(block, remainingSpace));
      }
      break;
    }

    formattedBlocks.push(block);
    currentLength += block.length;
  }

  const finalFormattedContext = formattedBlocks.join('\n');
  const tokenEstimate = estimateTokens(finalFormattedContext);

  const isSparse = topMemories.length < 2;

  return {
    isSparse,
    count: topMemories.length,
    selectedEra,
    fallbackMessage: isSparse ? "You haven't logged enough memories from this time yet. Responses will be limited." : null,
    formattedContext: finalFormattedContext,
    memories: topMemories.map(m => ({
      memoryId: m.memoryId,
      title: m.title,
      entryDate: m.entryDate,
      era: m.era,
      sentimentScore: m.sentimentScore,
      similarity: parseFloat((m.similarity || 0).toFixed(4)),
      excerpt: m.decryptedContent
    })),
    tokenEstimate
  };
}
