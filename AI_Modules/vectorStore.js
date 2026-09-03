import { createClient } from '@supabase/supabase-js';

// In-Memory Vector Store Index for zero-config local development
const localVectorIndex = [];

// Initialize Supabase Client if credentials are provided
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
let supabase = null;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('⚡ Supabase Client initialized for pgvector vector store.');
  } catch (err) {
    console.warn('Could not initialize Supabase client:', err.message);
  }
}

/**
 * Calculates Cosine Similarity between two N-dimensional vectors.
 * @param {Array<number>} vecA 
 * @param {Array<number>} vecB 
 * @returns {number} Score between -1.0 and 1.0 (higher = more similar)
 */
export function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  return dotProduct / denominator;
}

/**
 * Stores vector embedding alongside payload metadata into Supabase pgvector or Local Store.
 * 
 * @param {object} params
 * @param {string} params.memoryId - Unique ID of memory
 * @param {string} params.userId - User ID
 * @param {Array<number>} params.embedding - 768-dim float vector
 * @param {object} params.metadata - Metadata payload (era, entryDate, sentimentScore, title, etc.)
 * @param {string} params.encryptedText - Encrypted journal string
 * @returns {Promise<{ success: boolean, store: string, memoryId: string }>}
 */
export async function storeVectorEmbedding({ memoryId, userId, embedding, metadata, encryptedText }) {
  const record = {
    id: memoryId,
    user_id: userId,
    title: metadata.title,
    encrypted_text: encryptedText,
    era: metadata.era,
    entry_date: metadata.entryDate,
    emotion_tags: metadata.emotionTags || [],
    context_tags: metadata.contextTags || [],
    sentiment_score: metadata.sentimentScore,
    media_url: metadata.mediaUrl || null,
    embedding: embedding,
    metadata: metadata,
    created_at: new Date().toISOString()
  };

  let storedInSupabase = false;

  // 1. Persist to Supabase pgvector if client is active
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('memories_vector')
        .upsert({
          memory_id: memoryId,
          user_id: userId,
          title: metadata.title,
          encrypted_text: encryptedText,
          era: metadata.era,
          entry_date: metadata.entryDate,
          emotion_tags: metadata.emotionTags,
          context_tags: metadata.contextTags,
          sentiment_score: metadata.sentimentScore,
          media_url: metadata.mediaUrl,
          embedding: embedding,
          metadata: metadata,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.warn('Supabase insertion error (table memories_vector might need pgvector setup):', error.message);
      } else {
        storedInSupabase = true;
      }
    } catch (err) {
      console.warn('Failed inserting to Supabase:', err.message);
    }
  }

  // 2. Always maintain local in-memory vector index for instant local search & testing
  const existingIdx = localVectorIndex.findIndex(r => r.id === memoryId);
  if (existingIdx >= 0) {
    localVectorIndex[existingIdx] = record;
  } else {
    localVectorIndex.push(record);
  }

  return {
    success: true,
    store: storedInSupabase ? 'Supabase pgvector' : 'Local In-Memory Vector Store',
    memoryId
  };
}

/**
 * Searches stored vectors using Cosine Similarity and optional metadata filters.
 * 
 * @param {Array<number>} queryVector - 768-dim query vector
 * @param {object} [filters] - Filter by userId, era, minSentiment, etc.
 * @param {number} [topK=5] - Number of top results to return
 */
export async function searchVectorStore(queryVector, filters = {}, topK = 5) {
  let candidates = localVectorIndex;

  // Apply Metadata Filtering
  if (filters.userId) {
    candidates = candidates.filter(c => c.user_id === filters.userId);
  }
  if (filters.era) {
    candidates = candidates.filter(c => c.era === filters.era);
  }
  if (filters.minSentiment !== undefined) {
    candidates = candidates.filter(c => c.sentiment_score >= filters.minSentiment);
  }

  // Rank candidates by cosine similarity score
  const scoredResults = candidates.map(c => ({
    memoryId: c.id,
    title: c.title,
    era: c.era,
    entryDate: c.entry_date,
    sentimentScore: c.sentiment_score,
    encryptedText: c.encrypted_text,
    similarity: cosineSimilarity(queryVector, c.embedding)
  }));

  scoredResults.sort((a, b) => b.similarity - a.similarity);
  return scoredResults.slice(0, topK);
}

/**
 * Returns SQL Schema definition for setting up Supabase PostgreSQL with pgvector.
 */
export function getSupabaseSchemaSQL() {
  return `
-- Enable pgvector extension in Supabase PostgreSQL
CREATE EXTENSION IF NOT EXISTS vector;

-- Create memories_vector table with 768-dim embedding support
CREATE TABLE IF NOT EXISTS memories_vector (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    memory_id VARCHAR(255) UNIQUE NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    title TEXT NOT NULL,
    encrypted_text TEXT NOT NULL,
    era VARCHAR(100) NOT NULL,
    entry_date DATE,
    emotion_tags TEXT[],
    context_tags TEXT[],
    sentiment_score FLOAT,
    media_url TEXT,
    embedding VECTOR(768),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create HNSW Cosine Index for fast vector similarity search
CREATE INDEX IF NOT EXISTS idx_memories_vector_embedding 
ON memories_vector 
USING hnsw (embedding vector_cosine_ops);

-- Create B-Tree index for metadata filtering by user and era
CREATE INDEX IF NOT EXISTS idx_memories_user_era 
ON memories_vector (user_id, era);
`;
}
