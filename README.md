# LegacyLane: The Living Archive of Your Journey

> **A living archive for your sports and life milestones.**  
> Relive the matches, the comebacks, and the quiet moments that shaped who you are—preserved in an interactive, beautifully rendered timeline for you and your family.

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
  <img src="https://img.shields.io/badge/Security-AES--256--GCM-E02424?style=for-the-badge&logo=letsencrypt&logoColor=white" alt="AES-256" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License: MIT" />
</p>

---

## 💡 Why LegacyLane (The Vision)

Athletes, artists, and driven individuals dedicate their lives to mastering their craft, yet their journey is often scattered across old phones, fading tickets, and fragmented social posts:

### The Challenge
* **Scattered Footprints**: Match reports, medal photos, ticket stubs, and diary notes are scattered across camera rolls and messaging apps.
* **Passive Feeds**: Traditional social feeds prioritize fleeting algorithms over authentic reflection and personal growth.
* **Lost Connection**: During burnout or career transitions, it is easy to forget the hunger, courage, and small victories that laid the foundation.

### The Sanctuary
* **Interactive Career Roadmap**: Every achievement, comeback, and formative moment is structured as a milestone-based progression map inspired by classic tactical route maps.
* **Reflective Journey Timeline**: A dedicated chronological chronicle for personal life chapters, college days, and career transitions.
* **Emotional Growth Tracking**: Mood and reflection analytics that reveal how resilience and mindset evolve across seasons.
* **Private Encrypted Archive**: AES-256-GCM encrypted journal logs ensuring your private memories remain safe for family and future generations.

---

## ✨ Key Features

* **🗺️ Chronological Milestone Roadmap (`ScoreHeroLevelMap.jsx`)**: An interactive progression map rendering athletic achievements as milestone chapters with star ratings, match stats, and media assets.
* **🧭 Multi-Domain Support (`journeyConfig.js`)**: Fluidly toggle between **Sports Journeys** (*Football, Cricket, Basketball, Athletics*) and **Life Chronicle** (*Education, Career, Personal*) with dedicated visual aesthetics.
* **📖 Reflective Life Timeline (`ChronologicalTimeline.jsx`)**: An elegant, editorial vertical timeline designed for personal reflections, wisdom notes, and life milestones.
* **🕯️ Memory Inspector & Keepsake Cards (`MemoryInspectorModal.jsx`)**: Deep-dive into any logged moment with high-resolution photo view, match details, lesson highlights, and tags.
* **📈 Emotional Journey & Growth (`SentimentAnalyticsModal.jsx`)**: Visual synthesis of emotional trajectories, mood distribution, and milestones across seasons.
* **🎨 Editorial 3D Environments (`ThreeCanvas.jsx`)**: WebGL scenes featuring tactile grounds, pitch turf, hardwood courts, and constellation fields tailored to each discipline.
* **🔐 Private & Encrypted Vault (`encryption.js`)**: Secure AES-256-GCM encryption at rest for sensitive reflections and personal logs.
* **👥 Family & Teammate Circle**: Controlled sharing permissions allowing teammates and mentors to view milestones and celebrate legacy.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18 + Vite 5** | High-performance component architecture, rapid HMR development. |
| **3D Graphics & Styling** | **Three.js + Tailwind CSS** | Warm archival design system, WebGL scenes, Fraunces serif typography. |
| **API Server** | **Node.js + Express 4** | REST API handling memory preservation, authentication, and media uploads. |
| **Databases** | **SQLite + MongoDB** | Relational user accounts and rich unstructured memory entries. |
| **Security** | **AES-256-GCM + Bcrypt** | Secure encryption for private journals and salted credential hashing. |

---

## 📐 Architecture

LegacyLane follows a clean decoupled architecture:

```
┌────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION TIER                             │
│       React 18 + Vite 5  │  Three.js WebGL  │  Tailwind CSS            │
│  (ScoreHeroLevelMap, LifeTimeline, MemoryInspector, SentimentModal)    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP REST (VITE_API_URL)
┌───────────────────────────────────▼────────────────────────────────────┐
│                         APPLICATION API TIER                           │
│                      Node.js Express Server (Port 5000)                │
│    • Auth & Profile Management      • Memory Ingestion Pipeline        │
│    • Search & Timeline Filters      • File Upload Controller (Multer)  │
└───────────────┬───────────────────────────────────┬────────────────────┘
                │                                   │
┌───────────────▼────────────────┐ ┌────────────────▼────────────────────┐
│       PERSISTENCE TIER         │ │          SECURITY TIER              │
│  • SQLite (better-sqlite3)     │ │  • AES-256-GCM Encryption Engine    │
│    - Users, Profiles, ACL      │ │  • Password Hashing & Salts         │
│  • MongoDB (MemoryLogs)        │ │  • Secure Token Authorization       │
│    - Encrypted Journals        │ │                                     │
│    - Media Assets & Milestones │ │                                     │
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
├── AI_Modules/               # Multimodal Perception, Continual Learning & RAG Engine
│   ├── multimodalPerception.js# Vision feature extraction, scene cues, and emotional perception
│   ├── learningEngine.js     # Milestone archetypes, emotional resilience curves, and knowledge synthesis
│   ├── embeddings.js         # Gemini 768-dim embeddings & fallback engine
│   ├── encryption.js         # AES-256-GCM journal text encryption at rest
│   ├── vectorStore.js        # Cosine similarity index & Supabase pgvector schema exporter
│   ├── ragEngine.js          # Era-filtered hybrid RAG retrieval pipeline
│   ├── personaOrchestrator.js# Younger Self multimodal persona, age logic & crisis safety rules
│   ├── sidelineSocket.js     # WebSocket token streamer for real-time dialogue & instant learning
│   ├── test_*.js             # Automated verification test suites (perception, learning, rag, persona)
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
