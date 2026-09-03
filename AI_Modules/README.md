# LegacyLane AI Modules — Phase 1 Ingestion & Vector Embedding Pipeline

Production-grade Memory Vectorization, AES-256 Encryption, and Persona Engine for **LegacyLane**.

## 🚀 Key Features

1. **Rich Embedding Payload Formatting**:
   Formats memory attributes into chunked semantic representations:
   `"Era: {era} | Date: {entryDate} | Title: {title} | Emotion: {emotionTags.join(', ')} | Journal: {description}"`

2. **Modular Vector Embedding Generation (768-dim)**:
   - **Google Gemini Embedding API (`text-embedding-004`)**: Powered by `@google/genai`.
   - **Local Ollama Fallback**: Calls local `nomic-embed-text` or `all-minilm` embeddings (`http://localhost:11434`).
   - **Offline Deterministic Fallback**: Computes normalized 768-dim vector math offline when APIs are unconfigured.

3. **AES-256-GCM Encryption**:
   - Encrypts sensitive journal reflections before storage using `crypto` AES-256-GCM with authentication tags.

4. **Vector Store Integration (Supabase pgvector / Local Index)**:
   - Persists embeddings and metadata to Supabase PostgreSQL with `pgvector` extension when `SUPABASE_URL` is set.
   - Automatically maintains a local in-memory vector index with Cosine Similarity ranking for rapid offline execution.

5. **Zero-Training Guarantee**:
   - Built under commercial terms ensuring diary reflections & embeddings are never retained for public model training. Attached with `X-Zero-Training-Guarantee: Enabled` headers.

---

## 📡 API Endpoints

### `POST /api/memories/ingest`
Ingests memory payload, generates 768-dim vector, encrypts description, and updates vector store index.

#### Request Body:
```json
{
  "userId": "usr_12345",
  "title": "Championship Goal",
  "description": "Scored header in the 90th minute.",
  "entryDate": "2024-05-15",
  "era": "Youth Era (2020-2024)",
  "emotionTags": ["Triumph", "Joy"],
  "contextTags": ["Finals", "Header"],
  "sentimentScore": 0.95,
  "mediaUrl": "http://localhost:5000/uploads/media-123.jpg"
}
```

#### Response (`201 Created`):
```json
{
  "status": "success",
  "memoryId": "mem_vec_1788455233163_w5vhe",
  "message": "Memory successfully ingested, journal text encrypted, and 768-dim vector index updated.",
  "vectorDimension": 768,
  "provider": "google-gemini (text-embedding-004)",
  "encrypted": true,
  "storageTarget": "Supabase pgvector",
  "zeroTrainingGuarantee": true,
  "metadata": {
    "userId": "usr_12345",
    "title": "Championship Goal",
    "era": "Youth Era (2020-2024)",
    "entryDate": "2024-05-15",
    "sentimentScore": 0.95,
    "emotionTags": ["Triumph", "Joy"],
    "contextTags": ["Finals", "Header"],
    "mediaUrl": "http://localhost:5000/uploads/media-123.jpg"
  }
}
```

### `GET /api/memories/vector-search?query=...&userId=...`
Performs semantic similarity query against stored vector embeddings.

---

## 🛢️ Supabase pgvector Setup (Optional)
Run this SQL script in your Supabase SQL Editor:
```sql
CREATE EXTENSION IF NOT EXISTS vector;

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

CREATE INDEX IF NOT EXISTS idx_memories_vector_embedding 
ON memories_vector USING hnsw (embedding vector_cosine_ops);
```

---

## 🧪 Running Tests
```bash
node AI_Modules/test_pipeline.js
```
