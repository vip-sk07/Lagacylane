# LegacyLane AI Modules — Phase 1 & Phase 2 AI Engine

Production-grade Memory Vectorization, AES-256 Encryption, Era-Filtered Hybrid RAG Engine, and Persona Generation for **LegacyLane**.

## 🚀 Key Features

1. **Phase 1: Rich Ingestion & Vectorization Pipeline**:
   - Formats memory attributes into chunked semantic representations:
     `"Era: {era} | Date: {entryDate} | Title: {title} | Emotion: {emotionTags.join(', ')} | Journal: {description}"`
   - **Google Gemini Embedding API (`text-embedding-004`)**: Powered by `@google/genai` (768-dim float vector).
   - **Local Ollama & Deterministic Fallback**: Support for `nomic-embed-text` and zero-downtime offline vector math.
   - **AES-256-GCM Encryption**: Encrypts sensitive journal text before storage.
   - **Zero-Training Guarantee**: Commercial terms header (`X-Zero-Training-Guarantee: Enabled`).

2. **Phase 2: Era-Filtered Hybrid RAG Engine (`retrieveEraContext`)**:
   - **Stage 1 (Hard Metadata Filter)**: Enforces SQL/vector constraint `WHERE userId = :userId AND era = :selectedEra`. Under NO circumstances can memories from future/other eras bleed into context.
   - **Stage 2 (Cosine Similarity Ranking)**: Ranks era-filtered memories by prompt vector similarity, selecting top $K$ ($K=4$).
   - **Sparse Data Fallback**: Triggers fallback message if zero/sparse memories exist:
     `"You haven't logged any memories from this time yet. Responses will be limited."`
   - **Token Budgeting & Summarization**: Formats output into a markdown block strictly under 800 tokens (~3200 characters).

---

## 📡 API Endpoints

### 1. `POST /api/memories/ingest`
Ingests memory payload, generates 768-dim vector, encrypts description, and updates vector store index.

### 2. `POST /api/memories/retrieve-context`
Executes Era-Constrained Hybrid RAG context retrieval.

#### Request Body:
```json
{
  "userId": "usr_12345",
  "selectedEra": "High School (Age 13-17)",
  "userPrompt": "Tell me about my basketball championship game",
  "topK": 4
}
```

#### Response (`200 OK`):
```json
{
  "isSparse": false,
  "count": 2,
  "selectedEra": "High School (Age 13-17)",
  "fallbackMessage": null,
  "formattedContext": "### Memory 1: High School District Finals\n- **Date**: 2016-03-12\n...",
  "memories": [
    {
      "memoryId": "mem_vec_123",
      "title": "High School District Finals",
      "entryDate": "2016-03-12",
      "era": "High School (Age 13-17)",
      "similarity": 0.8954,
      "excerpt": "Scored the decisive 3-pointer..."
    }
  ],
  "tokenEstimate": 122
}
```

### 3. `GET /api/memories/vector-search?query=...&userId=...`
Performs semantic similarity query against stored vector embeddings.

---

## 🧪 Running Tests
```bash
# Test Phase 1 Ingestion Pipeline
node AI_Modules/test_pipeline.js

# Test Phase 2 Era-Filtered Hybrid RAG Engine
node AI_Modules/test_rag.js
```
