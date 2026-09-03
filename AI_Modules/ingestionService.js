import { generateEmbedding } from './embeddings.js';
import { encryptText } from './encryption.js';
import { storeVectorEmbedding, searchVectorStore } from './vectorStore.js';
import { analyzeSentiment } from './index.js';

/**
 * Formats memory parameters into a structured, rich context payload string for embedding models.
 * Format: "Era: {era} | Date: {entryDate} | Title: {title} | Emotion: {emotionTags.join(', ')} | Journal: {description}"
 * 
 * @param {object} params
 * @returns {string} Rich chunked payload
 */
export function formatEmbeddingPayload({ era, entryDate, title, emotionTags, description }) {
  const formattedEra = era || 'Youth Era';
  const formattedDate = entryDate || new Date().toISOString().split('T')[0];
  const formattedTitle = title || 'Untitled Memory';
  
  let emotionStr = '';
  if (Array.isArray(emotionTags)) {
    emotionStr = emotionTags.join(', ');
  } else if (typeof emotionTags === 'string') {
    emotionStr = emotionTags;
  }

  const formattedJournal = description || '';

  return `Era: ${formattedEra} | Date: ${formattedDate} | Title: ${formattedTitle} | Emotion: ${emotionStr} | Journal: ${formattedJournal}`;
}

/**
 * Executes the complete Memory Ingestion & Vector Embedding Pipeline.
 * 
 * Steps:
 * 1. Validate & sanitize memory input payload
 * 2. Calculate dynamic sentiment score if missing
 * 3. Build rich structured embedding payload
 * 4. Generate 768-dimensional vector embedding (Gemini / Ollama / Fallback)
 * 5. Encrypt raw journal description with AES-256-GCM
 * 6. Store vector + metadata in Supabase pgvector or Local Vector Store
 * 7. Return production status payload with zero-training guarantee confirmation
 * 
 * @param {object} memoryPayload 
 * @returns {Promise<object>} Ingestion summary
 */
export async function ingestMemoryPayload(memoryPayload) {
  const {
    userId = 'usr_anonymous',
    title = 'Memory Entry',
    description = '',
    entryDate = new Date().toISOString().split('T')[0],
    era = 'Youth Era',
    emotionTags = [],
    contextTags = [],
    sentimentScore,
    mediaUrl = null
  } = memoryPayload;

  // 1. Unique Memory ID Generation
  const memoryId = 'mem_vec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

  // 2. Compute Sentiment Score if not explicitly provided
  const computedSentiment = (typeof sentimentScore === 'number') 
    ? sentimentScore 
    : analyzeSentiment(title, description);

  // 3. Format Rich Text Chunk Payload
  const richPayloadText = formatEmbeddingPayload({
    era,
    entryDate,
    title,
    emotionTags,
    description
  });

  // 4. Generate 768-dim Vector Embedding
  const embeddingResult = await generateEmbedding(richPayloadText);

  // 5. Encrypt Raw Text Field before storage
  const encryptedPayload = encryptText(description);

  // 6. Metadata Payload for Vector Index
  const metadata = {
    userId,
    title,
    era,
    entryDate,
    emotionTags: Array.isArray(emotionTags) ? emotionTags : [emotionTags],
    contextTags: Array.isArray(contextTags) ? contextTags : [contextTags],
    sentimentScore: computedSentiment,
    mediaUrl,
    richPayloadText
  };

  // 7. Store vector embedding + metadata
  const storageResult = await storeVectorEmbedding({
    memoryId,
    userId,
    embedding: embeddingResult.embedding,
    metadata,
    encryptedText: encryptedPayload.encoded
  });

  // 8. Return response payload
  return {
    status: 'success',
    memoryId,
    message: 'Memory successfully ingested, journal text encrypted, and 768-dim vector index updated.',
    vectorDimension: embeddingResult.dimension,
    provider: embeddingResult.provider,
    encrypted: true,
    storageTarget: storageResult.store,
    zeroTrainingGuarantee: embeddingResult.zeroTrainingGuarantee,
    metadata: {
      userId,
      title,
      era,
      entryDate,
      sentimentScore: computedSentiment,
      emotionTags: metadata.emotionTags,
      contextTags: metadata.contextTags,
      mediaUrl
    }
  };
}

/**
 * Vector search query pipeline - searches memories using prompt vectorization.
 */
export async function searchMemoriesByQuery(queryText, userId, topK = 5) {
  const queryEmbedding = await generateEmbedding(queryText);
  const results = await searchVectorStore(queryEmbedding.embedding, { userId }, topK);
  return results;
}
