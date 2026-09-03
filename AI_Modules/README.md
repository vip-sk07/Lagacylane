# LegacyLane AI Modules — Phase 1, 2 & 3 Complete AI Engine

Production-grade Memory Vectorization, AES-256 Encryption, Era-Filtered Hybrid RAG Engine, and AI Younger Self Persona Orchestration for **LegacyLane**.

## 🚀 Key Features

1. **Phase 1: Memory Ingestion & Vectorization Pipeline**:
   - Formats memory attributes into chunked semantic representations:
     `"Era: {era} | Date: {entryDate} | Title: {title} | Emotion: {emotionTags.join(', ')} | Journal: {description}"`
   - **Google Gemini Embedding API (`text-embedding-004`)**: Powered by `@google/genai` (768-dim float vector).
   - **Local Ollama & Deterministic Fallback**: Support for `nomic-embed-text` and zero-downtime offline vector math.
   - **AES-256-GCM Encryption**: Encrypts sensitive journal text before storage.
   - **Zero-Training Guarantee**: Commercial terms header (`X-Zero-Training-Guarantee: Enabled`).

2. **Phase 2: Era-Filtered Hybrid RAG Engine (`retrieveEraContext`)**:
   - **Stage 1 (Hard Metadata Filter)**: Enforces constraint `WHERE userId = :userId AND era = :selectedEra`. Under NO circumstances can memories from future/other eras bleed into context.
   - **Stage 2 (Cosine Similarity Ranking)**: Ranks era-filtered memories by prompt vector similarity, selecting top $K$ ($K=4$).
   - **Sparse Data Fallback**: Triggers fallback message if zero/sparse memories exist:
     `"You haven't logged any memories from this time yet. Responses will be limited."`
   - **Token Budgeting & Summarization**: Formats output into a markdown block strictly under 800 tokens (~3200 characters).

3. **Phase 3: Younger Self Persona & System Prompt Orchestration (`generateYoungerSelfResponse`)**:
   - **Dynamic Era Age Calculation**: Computes `ERA_AGE` dynamically from era metadata (e.g. "High School (Age 13-17)" -> "13-17").
   - **System Prompt Contract**: Enforces strict temporal boundaries where knowledge is locked up to selected era.
   - **Safety Guardrail Engine**: Automatically detects self-harm/crisis triggers, breaking character gently to provide 24/7 helpline resources (`988`, `Tele-MANAS 14416`).
   - **Adult Burnout Grounding**: Detects adult fatigue/exhaustion, reminding the user of early dreams and sacrifices.
   - **Candid Future Event Handling**: Candidly responds to undocumented future events: *"I don't remember that happening yet—did that happen after this season?"*.

---

## 📡 API Endpoints

### 1. `POST /api/chat`
Phase 3 AI Younger Self Chat orchestration with RAG context and safety guardrails.

#### Request Body:
```json
{
  "userId": "usr_12345",
  "era": "High School (Age 13-17)",
  "userMessage": "Do you remember our basketball championship?",
  "history": []
}
```

#### Response (`200 OK`):
```json
{
  "response": "Hey! Of course I remember...",
  "crisisTriggered": false,
  "isBurnout": false,
  "era": "High School (Age 13-17)",
  "eraAge": "13-17",
  "model": "google-gemini"
}
```

### 2. `POST /api/memories/ingest`
Ingests memory payload, generates 768-dim vector, encrypts description, and updates vector store index.

### 3. `POST /api/memories/retrieve-context`
Executes Era-Constrained Hybrid RAG context retrieval.

---

## 🧪 Running Automated Test Suites
```bash
# Test Phase 1 Ingestion Pipeline
node AI_Modules/test_pipeline.js

# Test Phase 2 Era-Filtered Hybrid RAG Engine
node AI_Modules/test_rag.js

# Test Phase 3 Persona & System Prompt Orchestrator
node AI_Modules/test_persona.js
```
