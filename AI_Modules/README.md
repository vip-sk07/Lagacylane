# LegacyLane AI Modules — Multimodal Perception & Continual Cognitive Learning Engine

Production-grade Multimodal Perception, Continual Cognitive Learning, Memory Vectorization, AES-256 Encryption, Era-Filtered Hybrid RAG Engine, Younger Self Persona Orchestration, and Sideline AI Real-Time WebSocket Streaming & Instant Learning Engine for **LegacyLane**.

## 🚀 Key Features

1. **Multimodal Perception Engine (`multimodalPerception.js`)**:
   - Perceives images, match photos, and visual memory uploads (local files, buffers, URLs, base64 data URLs).
   - **Google Gemini 1.5 Flash Multimodal Vision API (`@google/genai`)**: Performs high-level perceptual scene reasoning.
   - **Cognitive Vision Heuristic & Neural Semantic Analyzer**: Offline fallback engine that extracts:
     - `visualSummary`: Rich narrative description of visible scenes, jerseys, pitch conditions, equipment, and lighting.
     - `perceivedEmotions`: Visual affective telemetry (e.g. *Jubilant*, *Triumphant*, *Grit*, *Deep Camaraderie*).
     - `sceneContext`: Stadium floodlights, grass turf, basketball court, track finish line, family living room.
     - `tacticalElements`: Scoring plays, defensive stops, captaincy moments, comeback finishes.
     - `visualTags`: Structured categorical hashtags.
   - **Multimodal Context Fusion**: Blends visual descriptors, emotional telemetry, and journal narratives into composite payloads for vector indexing.

2. **Continual Cognitive Learning Engine (`learningEngine.js`)**:
   - **Emotional Resilience Curve**: Analyzes adversity-to-triumph recovery sequences, computing resilience scores and comeback narratives.
   - **Milestone Archetype Classification**: Automatically clusters memories into:
     - *The Breakthrough* (Debuts, trial selections)
     - *The Long Grind* (Conditioning, early morning drills)
     - *The Comeback* (Injury rehab, overcoming losses)
     - *The Camaraderie* (Locker room bonds, brotherhood)
     - *The Defining Moment* (Championship finals, trophy lifts)
     - *The Quiet Milestone* (Mentorship reflections, inner peace)
   - **Thematic Core Value Fingerprinting**: Quantifies foundational pillars (*Grit*, *Camaraderie*, *Precision*, *Humility*, *Purpose*).
   - **Continuous Knowledge Graph**: Dynamically updates the user's cognitive trajectory with every logged memory.

3. **Phase 1: Memory Ingestion & Vectorization Pipeline (`ingestMemoryPayload`)**:
   - Modular 768-dim float vector embeddings via Google Gemini (`text-embedding-004`), Ollama (`nomic-embed-text`), or deterministic offline vector math.
   - Automatically executes multimodal perception on attached photos.
   - AES-256-GCM encryption of personal journal content.
   - Zero-Training Guarantee.

4. **Phase 2: Era-Filtered Hybrid RAG Engine (`retrieveEraContext`)**:
   - Strict metadata filtering (`userId`, `selectedEra`, `journeyType`, `domain`) to prevent cross-era and cross-domain bleeding.
   - Cosine similarity ranking with token budget management (< 800 tokens).

5. **Phase 3: Younger Self Persona & Multimodal Chat Orchestration (`generateYoungerSelfResponse`)**:
   - Supports direct image inputs in conversational chat: Younger Self inspects uploaded photos, recognizes visual details, and responds with emotional grounding.
   - Injects learned cognitive insights (resilience curve, core values) into system prompts.
   - Temporal guardrails, adult burnout intervention, and safety crisis resources (`988`, `Tele-MANAS`).

6. **Phase 4: Sideline AI Real-Time WebSocket Streaming & Instant Learning (`initSidelineWebSocketServer`)**:
   - WebSocket streaming on `/ws/sideline-ai`.
   - Real-time token-by-token typewriter streaming.
   - Instant Learning Hook (`+ LOG PLAY`) with multimodal image vectorization.

---

## 📡 Endpoints Specification

### 1. `POST /api/ai/perceive` (Multimodal Perception API)
- Accepts uploaded image file or `imageUrl`. Returns deep visual summary, emotions, scene context, tactical highlights, and tags.

### 2. `GET /api/ai/cognitive-profile/:userId` (Cognitive Trajectory API)
- Returns the user's continual learning profile, emotional resilience score, and milestone archetypes.

### 3. `POST /api/chat` (Younger Self Multimodal Chat)
- Supports textual queries and `imageSource` for visual perception dialogue.

### 4. `POST /api/memories` (Memory Ingestion API)
- Stores memory, extracts multimodal perception from attached photos, and updates continuous learning graphs.

### 5. `ws://localhost:5000/ws/sideline-ai` (WebSocket Real-Time API)
- Real-time token streaming and multimodal instant learning.

---

## 🧪 Running Automated Test Suites
```bash
# 1. Test Multimodal Perception Engine
node AI_Modules/test_multimodal_perception.js

# 2. Test Continual Cognitive Learning Engine
node AI_Modules/test_learning_engine.js

# 3. Test Memory Vectorization & Ingestion Pipeline
node AI_Modules/test_pipeline.js

# 4. Test Era-Filtered Hybrid RAG Engine
node AI_Modules/test_rag.js

# 5. Test Younger Self Persona & Multimodal Chat Orchestrator
node AI_Modules/test_persona.js

# 6. Test Real-Time WebSocket Streaming & Instant Learning
node AI_Modules/test_websocket.js
```
