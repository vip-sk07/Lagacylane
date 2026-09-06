# LegacyLane: The One Who Lives

> **An interactive, RAG-powered digital memory sanctuary and 3D tactical time-capsule.**  
> Transform athletic milestones and life achievements into an interactive tactical roadmap, converse directly with your **"Younger Self"** through era-locked AI persona orchestration, track emotional resilience across disciplines, and preserve your legacy with bank-grade encryption.

---

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  <img src="https://img.shields.io/badge/AI-RAG_%2B_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Security-AES--256--GCM-E02424?style=for-the-badge&logo=letsencrypt&logoColor=white" alt="AES-256" />
  <img src="https://img.shields.io/badge/Institution-Mepco_Schlenk_Engg_College-blue?style=for-the-badge" alt="MSEC" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License: MIT" />
</p>

---

---

## 💡 Why LegacyLane (Problem → Solution)

Athletes and ambitious individuals dedicate their lives to mastering their craft, yet their journey is often lost to time:

### The Problem
* **Fragmented Footprints**: Highlights, match reports, awards, and emotional struggles are scattered across old camera rolls, messaging apps, and decaying physical scrapbooks.
* **Passive Archiving**: Traditional social media feeds passively document outcomes for external validation, losing the internal psychological growth, tactics, and mindset.
* **Disconnect from Past Drive**: In moments of adult burnout, slump, or career transition, athletes lose touch with the raw hunger, joy, and sacrifices of their younger self.

### The Solution
* **Tactical 3D Roadmap**: Every achievement, comeback, and formative moment is structured as a playable, milestone-based journey inspired by classic sports progression maps.
* **Era-Locked "Younger Self" AI Persona**: Chat with the version of you that scored that 90th-minute winner or survived high-school trials—strictly filtered to historical era memories with zero context bleeding from future years.
* **Mental Wellness & Sentiment Analytics**: Longitudinal NLP sentiment scoring maps your emotional trajectory, resilience levels, and coping mechanisms across both sports and life milestones.
* **Privacy-First Memory Vault**: End-to-end AES-256-GCM encrypted journal logs with strict family/mentor access delegation.

---

## ✨ Key Features

* **🗺️ Chronological Tactical Roadmap (`ScoreHeroLevelMap.jsx`)**: An isometric progression map rendering achievements as milestone nodes with star ratings, match stats, and media assets.
* **🧭 Two-Level Domain Model (`journeyConfig.js`)**: Fluidly toggle between **Sports Journeys** (*Football, Cricket, Basketball, Athletics*) and **Life Journeys** (*Career, Personal, Education*) without cross-domain memory leakage.
* **🌌 Chronological Life Timeline (`ChronologicalLifeTimeline.jsx`)**: A clean, reflective timeline view custom-designed for life memories, distinct from the gamified sports level-map.
* **🤖 RAG-Driven "Younger Self" AI Companion (`AIYoungerSelfChat.jsx`)**: A conversational agent powered by Gemini embeddings and local vector indexing. It embodies your exact tone, knowledge boundary, and emotional state during a chosen historical era.
* **🛡️ Psychological Safety Guardrails (`personaOrchestrator.js`)**: Built-in distress keyword detection immediately pauses roleplay to provide compassionate support and emergency crisis lines (988 Lifeline, Tele-MANAS).
* **📈 Sentiment & Resilience Analytics (`SentimentAnalyticsModal.jsx`)**: Longitudinal sentiment curves, emotional volatility tracking, and multi-domain psychological synthesis across all logged milestones.
* **🎨 Config-Driven 3D WebGL Environments (`ThreeCanvas.jsx`)**: Three.js WebGL scenes that dynamically adapt their turf, lighting, goalposts, or constellation grids according to the active domain.
* **🔐 AES-256-GCM Encrypted Storage (`encryption.js`)**: Full encryption at rest for sensitive memory journals before storing them in MongoDB document collections.
* **⚡ WebSocket Token Streaming (`sidelineSocket.js`)**: Real-time token-by-token streaming for conversational responses with instant RAG memory ingestion.
* **👥 Family Vault & Mentorship Sharing 🚧 (in progress)**: Role-based access control (Viewer, Contributor, Admin) backed by SQLite relation tables for controlled family legacy sharing.

---

## 🛠️ Tech Stack

| Layer | Technology | Why Chosen |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18 + Vite 5** | High-performance component architecture, rapid HMR development, and seamless state management. |
| **3D Graphics & Styling** | **Three.js + Tailwind CSS** | Custom WebGL shader surfaces, procedural pitch/court rendering, and responsive glassmorphism UI. |
| **API Server** | **Node.js + Express 4** | Lightweight asynchronous REST API handling memory ingestion, auth, media uploads, and proxying. |
| **Relational Database** | **SQLite (`better-sqlite3`)** | Ultra-fast embedded relational store for user identities, athlete profiles, and family ACL permissions. |
| **Document Store** | **MongoDB 7** | Flexible schema for rich, unstructured memory entries, media assets, victory logs, and chat sessions. |
| **Vector Engine & RAG** | **Custom Vector Store + Cosine Similarity** | In-memory 768-dim vector index with hard metadata filtering, pre-configured for Supabase `pgvector` migration. |
| **AI & Embeddings** | **Google Gemini (`text-embedding-004`) / Ollama** | Semantic embeddings with deterministic mathematical fallback ensuring zero downtime in offline environments. |
| **Security** | **AES-256-GCM + Bcrypt** | Cryptographically secure cipher-block encryption for journal text; salted credential hashing. |
| **Realtime Streaming** | **WebSockets (`ws`)** | Low-latency bi-directional token streaming for interactive sideline AI chats. |

---

## 📐 Architecture

LegacyLane follows a modern tiered decoupled architecture ensuring clean separation of concerns between presentation, orchestration, and persistence:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION TIER                             │
│       React 18 + Vite 5  │  Three.js WebGL  │  Tailwind CSS            │
│  (ScoreHeroLevelMap, LifeTimeline, AIYoungerSelfChat, SentimentModal)  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP REST (VITE_API_URL) / WebSocket
┌───────────────────────────────────▼────────────────────────────────────┐
│                         APPLICATION API TIER                           │
│                      Node.js Express Server (Port 5000)                │
│    • Auth & Profile Management      • Memory Ingestion Pipeline        │
│    • Semantic Search & Pagination   • File Upload Controller (Multer)  │
└───────────────┬───────────────────────────────────┬────────────────────┘
                │                                   │
┌───────────────▼────────────────┐ ┌────────────────▼────────────────────┐
│       PERSISTENCE TIER         │ │         AI & VECTOR TIER            │
│  • SQLite (better-sqlite3)     │ │  • Gemini text-embedding-004        │
│    - Users, Profiles, ACL      │ │  • AES-256-GCM Encryption Engine    │
│  • MongoDB (MemoryLogs)        │ │  • Era-Constrained RAG Engine       │
│    - Encrypted Journals        │ │  • Persona Orchestration & Safety   │
│    - Media Assets & Chat Logs  │ │  • Sideline WebSocket Server (8080) │
└────────────────────────────────┘ └─────────────────────────────────────┘
```

> For the comprehensive architectural specification, database schemas, and requirement matrix, refer to the [Software Requirements Specification (SRS)](file:///d:/LegacyLane).

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` (or MongoDB Atlas)
* *(Optional)* **Google Gemini API Key**: For semantic vector embeddings (defaults to local mathematical vector fallback if omitted).

---

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/vip-sk07/Lagacylane.git
cd Lagacylane
```

#### 2. Backend API Setup
```bash
cd Backend
npm install
cp .env.example .env
npm start
```
*The server will initialize SQLite tables, connect to MongoDB, and listen on `http://localhost:5000`.*

#### 3. AI Modules & WebSocket Setup
```bash
cd ../AI_Modules
npm install
cp .env.example .env
npm start
```
*Starts the Sideline WebSocket server on `ws://localhost:8080` with vector indexing ready.*

#### 4. Frontend Setup
```bash
cd ../Frontend
npm install
cp .env.example .env
npm run dev
```
*Open [http://localhost:5173](http://localhost:5173) in your browser.*

---

### ⚡ Quick Demo Walkthrough

1. **Launch App**: Open `http://localhost:5173` and click **"Get Started"**.
2. **Create Athlete Account**: Register with your name, sport discipline (e.g. *Football*), and position.
3. **Explore the 3D Map**: Switch between **Football**, **Cricket**, and **Life Journey** tabs using the top domain switcher.
4. **Log a Milestone**: Click the **"+"** button to add a memory (e.g., *"State Championship Final Goal"*), assign stars, and write an emotion-rich reflection.
5. **Chat with Younger Self**: Open the **Younger Self AI Companion**, select your high school or youth era, and ask: *"How did you feel before taking that penalty kick?"* Watch it retrieve only that era's memories to respond in character!
6. **Inspect Wellness**: Open the **Sentiment Analytics** modal to view your resilience curve and cross-domain emotional insights.

---

## 📂 Project Structure

```
LegacyLane/
├── Frontend/                 # React 18 + Vite + Three.js Client
│   ├── src/
│   │   ├── components/       # Level maps, 3D Canvas, AI Chat, Modals, Toasts
│   │   ├── utils/            # journeyConfig.js (domain model), api.js (centralized API client)
│   │   ├── mockData.js       # Seeded historical milestones across sports & life
│   │   └── App.jsx           # Root application coordinator & state orchestrator
│   └── package.json
├── Backend/                  # Node.js + Express REST Application
│   ├── index.js              # REST endpoints, encryption pipeline, and auth routing
│   ├── database.js           # SQLite relational schemas (Users, Profiles, Vault ACL)
│   ├── mongodb.js            # MongoDB document client with in-memory fallback
│   ├── test.js               # End-to-end REST API integration test suite
│   └── package.json
├── AI_Modules/               # RAG, Vector Engine & Persona Orchestrator
│   ├── embeddings.js         # Gemini 768-dim embeddings & fallback engine
│   ├── encryption.js         # AES-256-GCM journal text encryption at rest
│   ├── vectorStore.js        # Cosine similarity index & Supabase pgvector schema exporter
│   ├── ragEngine.js          # Era-filtered hybrid RAG retrieval pipeline
│   ├── personaOrchestrator.js# System prompt generation, age logic & crisis safety rules
│   ├── sidelineSocket.js     # WebSocket token streamer for real-time dialogue
│   ├── test_*.js             # Automated verification test suites
│   └── package.json
└── README.md                 # Project documentation
```

---

## 👥 The Team

Developed by students of **B.Tech Artificial Intelligence & Data Science** at **Mepco Schlenk Engineering College**:

| Role | Name | Core Engineering Focus |
| :--- | :--- | :--- |
| **Frontend Lead** | **Gowtham Raj K** | React architecture, Three.js 3D visual engines, Score! Hero timeline UX |
| **Backend Lead** | **Karan Raj T** | Node.js/Express architecture, MongoDB & SQLite dual-persistence, API integrity |
| **AI Lead** | **Navis Joshva Donel J** | RAG retrieval pipeline, persona orchestration, AES-256 encryption, sentiment engine |

### Project Mentors
* **Dr. A. Shenbagarajan** — *Professor & Project Guide, Department of AI & Data Science*
* **Mrs. S. Haripriya** — *Assistant Professor, Department of AI & Data Science*

---

## 🧪 Testing & Verification

LegacyLane maintains automated test suites covering cryptographic integrity, vector dimensions, and conversational safety:

```bash
# 1. Run AI Vector Pipeline & Cryptography Tests
cd AI_Modules
node test_pipeline.js

# 2. Run Persona Orchestration & Crisis Safety Guardrail Tests
node test_persona.js

# 3. Run Era-Filtered RAG Retrieval Boundary Tests
node test_rag.js

# 4. Verify Frontend Production Build
cd ../Frontend
npm run build
```

*All AI modules pass 100% of boundary isolation, zero-context-bleeding, and token budgeting constraints (< 800 tokens per prompt).*

---

## 🗺️ Roadmap & Upcoming Milestones

- [x] **Two-Level Journey Domain Model**: Dynamic separation of Sports disciplines and Life timelines.
- [x] **Zero Plaintext Persistence**: Full AES-256-GCM encryption at rest on all journal entries.
- [x] **Domain-Scoped RAG Isolation**: Era-filtered retrieval with strict discipline isolation.
- [ ] **🚧 Supabase pgvector Cloud Migration**: Transitioning local vector store to persistent cloud pgvector tables.
- [ ] **🚧 Family Vault UI Dashboard**: Full visual interface for managing family access grants and view permissions.
- [ ] **🚧 Voice Synthesis (TTS / STT)**: Auditory dialogue mode allowing athletes to hear their Younger Self speak.
- [ ] **🚧 Vintage Trophy & Certificate Scanner**: Optical character recognition (OCR) pipeline for digitizing legacy newspaper clippings and paper medals.

---

## 📄 License & Acknowledgments

This project is licensed under the **MIT License** — see the `LICENSE` file for details.

Special thanks to the **Department of Artificial Intelligence & Data Science, Mepco Schlenk Engineering College** for providing the research guidance and compute resources required to make LegacyLane possible.

---

<p align="center">
  <b>Because every champion’s future is built on the moments they refused to forget. Live your legacy.</b>
</p>
