# LegacyLane AI Modules — Phase 1, 2, 3 & 4 Full Stack AI Engine

Production-grade Memory Vectorization, AES-256 Encryption, Era-Filtered Hybrid RAG Engine, Younger Self Persona Orchestration, and Sideline AI Real-Time WebSocket Streaming & Instant Learning Engine for **LegacyLane**.

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
   - **Dynamic Era Age Calculation**: Computes `ERA_AGE` dynamically from era metadata.
   - **System Prompt Contract**: Enforces strict temporal boundaries where knowledge is locked up to selected era.
   - **Safety Guardrail Engine**: Automatically detects self-harm/crisis triggers, breaking character gently to provide 24/7 helpline resources (`988`, `Tele-MANAS 14416`).
   - **Adult Burnout Grounding**: Reminds user of early dreams and sacrifices when adult exhaustion is detected.
   - **Candid Future Event Handling**: *"I don't remember that happening yet—did that happen after this season?"*.

4. **Phase 4: Sideline AI Real-Time WebSocket Streaming & Instant Learning (`initSidelineWebSocketServer`)**:
   - **WebSocket Endpoint**: Mounted on `/ws/sideline-ai?userId={id}&era={era}`.
   - **Real-Time Token Streaming**: Streams response tokens in real time `{ event: 'token', data: chunkText }`, ending with `{ event: 'done', fullResponse: string, insightQuote: string }`.
   - **Instant Learning Hook (`+ LOG PLAY`)**: On `{ event: 'log_play' }` message, immediately vectorizes the newly logged play, updates the active vector index, and broadcasts `{ event: 'memory_learned' }` so the VERY NEXT chat query immediately reflects the new memory!

---

## 📡 Endpoints Specification

### 1. `ws://localhost:5000/ws/sideline-ai` (WebSocket Real-Time API)
- Connects client HUD drawer to real-time token streaming and instant play learning.

### 2. `POST /api/chat` (REST Chat Endpoint)
- Phase 3 AI Younger Self Chat orchestration with RAG context and safety guardrails.

### 3. `POST /api/memories/ingest` (Ingestion API)
- Ingests memory payload, generates 768-dim vector, encrypts description, and updates vector store index.

### 4. `POST /api/memories/retrieve-context` (RAG Context API)
- Executes Era-Constrained Hybrid RAG context retrieval.

---

## 🧪 Running Automated Test Suites
```bash
# Test Phase 1 Ingestion Pipeline
node AI_Modules/test_pipeline.js

# Test Phase 2 Era-Filtered Hybrid RAG Engine
node AI_Modules/test_rag.js

# Test Phase 3 Persona & System Prompt Orchestrator
node AI_Modules/test_persona.js

# Test Phase 4 Real-Time WebSocket Streaming & Instant Learning
node AI_Modules/test_websocket.js
```
