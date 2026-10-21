# LegacyLane: Problems in the Project

Repo reviewed: `vip-sk07/Lagacylane` (public). Review date: 2026-10-17.

**How this was checked:** I read the README, the file list, `Backend/index.js` (routes, auth, CORS, vault, OTP, export/delete, upload), `AI_Modules/encryption.js`, the three `.env.example` files, and parts of `Frontend/timeline.html`. Nothing was run. Items marked **Seen** were confirmed in code. Items marked **To confirm** are likely, but I did not read every line.

Severity: **Critical** (data exposure or account takeover), **High** (breaks a feature or a promise in the SRS), **Medium** (quality, maintenance), **Low** (polish).

---

## 1. Security

| # | Severity | Problem | Where | Status |
|---|---|---|---|---|
| S1 | Critical | **No server-side authentication.** There is no JWT, session or cookie check. Routes trust the `userId` in the URL or body, so anyone who knows or guesses an ID can act as that user. | `Backend/index.js` (all `/api/profile`, `/api/memories`, `/api/chat`, `/api/vault`, `/api/family-circle`, `/api/users` routes) | Seen |
| S2 | Critical | **Anyone can export or delete another user's account.** `GET /api/users/:userId/export` returns profile, all memories and AI chat history. `DELETE /api/users/:userId` deletes the account. Neither checks who is calling. | `index.js` ~1834, ~1864 | Seen |
| S3 | Critical | **Vault access control is optional.** `GET /api/vault/:ownerId` only checks the family grant when the caller adds `?viewerId=`. Without it, the owner's memories are returned to anyone. | `index.js` ~1430 | Seen |
| S4 | High | **Vault PIN is stored in plain text** and compared with `===`. No hashing, no attempt limit beyond the general rate limiter. | `index.js` ~1486, ~1568 | Seen |
| S5 | High | **`/api/vault/verify-pin` creates users.** If the `userId` does not exist, it inserts a new user with password hash `session_local` and the PIN. | `index.js` ~1497, ~1579 | Seen |
| S6 | High | **Encryption key falls back to a known string** (`legacylane-secure-memory-encryption-key-32b!`), also printed in `.env.example`. If the key is not set, all "AES-256" data is encryptable by anyone who reads the repo. No key rotation. | `AI_Modules/encryption.js`, `.env.example` | Seen |
| S7 | High | **CORS allows every origin.** Both branches of the origin check call `callback(null, true)`, and `credentials: true` is on. | `index.js` ~50 | Seen |
| S8 | High | **Phone OTP login is a stub.** The code is printed to the server console, stored in an in-memory `Map` (lost on restart), and the six-digit code is only protected by a per-phone attempt counter. No SMS is sent. | `index.js` ~1894-1952 | Seen |
| S9 | High | **Uploaded files are public and not tied to a user.** `/uploads` is served statically with no auth, and `POST /api/upload` does not check who uploads. | `index.js` ~99, ~530 | Seen |
| S10 | Medium | **Google client ID is hard-coded** as a fallback, and the two `.env.example` files show different client IDs, so it is unclear which one is real. | `index.js` ~246, `Backend/.env.example`, `Frontend/.env.example` | Seen |
| S11 | Medium | **Google token check uses the `tokeninfo` URL** on every login instead of the official `google-auth-library`. This adds latency and a Google dependency per request. Issuer and expiry are not checked explicitly. | `index.js` ~253 | Seen |
| S12 | Medium | **Plain-text and local-only identity.** The page keeps `legacy_user_id`, `legacy_user`, and profile data in `localStorage`, so the identity the server trusts is whatever the browser sends. | `Frontend/timeline.html` ~2885-3154 | Seen |
| S13 | Medium | **No Content-Security-Policy, no `helmet`.** Pages load scripts from several CDNs (jsDelivr, cdnjs) with no integrity hashes. | all HTML pages | Seen (CDN list); helmet absence To confirm |
| S14 | Low | **Account deletion and export are unlogged.** No audit trail for sensitive actions. | `index.js` | To confirm |

## 2. Repository and build

| # | Severity | Problem | Detail |
|---|---|---|---|
| R1 | High | **`node_modules` is committed.** About 9,271 of the 9,359 tracked files are dependencies, including a compiled `better_sqlite3.node` binary. `.gitignore` lists `node_modules/`, so these were added before the rule or forced. The binary will not run on other operating systems. |
| R2 | Medium | **Duplicate pages.** `Frontend/*.html` and `Frontend/public/*.html` are copies (`timeline.html` is 13,215 lines in both, and the other pages match in size). Fixes made in one are easily missed in the other. `Frontend/index.html` and `LegacyLogin.html` have the same length but differ. |
| R3 | Medium | **Duplicate 3D assets.** The same field models exist as `.blend` (`Assets/3D`) and as `.glb` in both `Frontend/models` and `Frontend/public/models`. |
| R4 | Medium | **The README does not describe this code.** It names React components (`ScoreHeroLevelMap.jsx`, `ThreeCanvas.jsx`, `ChronologicalTimeline.jsx`, and others) and says "React 18 + Vite 5". The repo is large static HTML pages served by Express, and the Vite config does not build them. The README also links to a local path (`file:///d:/LegacyLane`). |
| R5 | Medium | **Vite is set up but unused.** `Frontend/package.json` has `vite` and `tailwind`/`postcss` config, but the pages pull Tailwind-style classes and libraries from CDNs. Build and dev scripts do not match how the app actually runs. |
| R6 | Medium | **Inconsistent ports.** README says the frontend runs on 5173; `Frontend/package.json` starts Vite on 3000; backend `.env.example` allows 5173; the root `package.json` starts only the backend. |
| R7 | Low | **Large root files and leftovers.** `Legacylane.docx`, `srs_content.txt`, `LegacyLane Home.html`, `LegacyLane Memory Ground.html` and `start_website.bat` sit in the repo root. The `.bat` file only works on Windows. |
| R8 | Low | **`.env.example` is duplicated** in root, `Backend/`, `AI_Modules/` and `Frontend/` with overlapping, partly conflicting values (for example `ALLOWED_ORIGIN`, `MONGO_URI`, `PORT` appear in several). |

## 3. Architecture and code quality

| # | Severity | Problem | Detail |
|---|---|---|---|
| A1 | High | **`Frontend/timeline.html` is 13,215 lines in one file** (markup, CSS, JavaScript, 3D scene, charts, modals, API calls). It is hard to test, review or change safely. |
| A2 | High | **`Backend/index.js` is 1,980 lines** with routes, validation, auth, business logic and AI calls in one file. No separation into routes, controllers and services. |
| A3 | High | **Two sources of truth for memories.** The page stores memories in `localStorage` (`legacylane_memories_v2`) and also in MongoDB through the API. There is no stated sync or conflict rule, so data can differ between devices. |
| A4 | Medium | **Two databases for one app.** SQLite holds users and ACL, MongoDB holds memories and chats. Deleting a user touches both by hand; there is no transaction across them, so a failure can leave orphaned data. |
| A5 | Medium | **AI modules run as a separate process** (WebSocket server on port 8080) with its own `.env`, while the backend also imports persona and RAG functions. Two start steps are needed, and nothing starts or health-checks them together. |
| A6 | Medium | **Hard-coded AI model name** (`gemini-3.5-flash-lite`) in `personaOrchestrator.js`. If the name changes or is unavailable, chat fails. |
| A7 | Medium | **Fallback behaviour is unclear when the Gemini key is missing.** The README says embeddings fall back to a local vector, but chat generation behaviour without a key is not documented. To confirm. |
| A8 | Medium | **Missing-user fallback in profile route.** `GET /api/profile/:userId` returns a fake "Athlete" user when the ID is unknown, instead of a 404. This hides bugs and leaks which IDs exist (S1). |
| A9 | Medium | **Libraries are old and pinned to CDNs** (three.js r128, chart.js 4.4.0, gsap 3.12.2, anime 3.2.1, confetti 1.6.0). No lockfile control and no offline build. |
| A10 | Low | **Duplicate route.** `/api/auth/google/client-id` is defined twice in `index.js` (~301 and ~384). |

## 4. Product gaps (against the SRS and your original brief)

| # | Severity | Problem | Detail |
|---|---|---|---|
| P1 | High | **Younger Self avatar is not a real talking character yet.** The repo has a chat drawer and a 3D athlete, but I saw no lip-sync, voice, or face animation tied to the AI reply. The avatar page I built separately (face, hair, outfits, speech) is not merged in. |
| P2 | High | **Younger Self can invent memories.** No sign that replies must cite a stored memory or refuse when none exists for that era. Add citations and an "I don't remember that" path. |
| P3 | High | **Google login is the only working social login**, and phone login is fake (S8). The brief asked for Google login; confirm email/password and Google are both complete. |
| P4 | Medium | **Sport theme change is only partly proven.** The 3D field models exist for football, cricket, basketball, tennis, swimming, track, combat and a generic "life" field. I did not confirm that typing a sport at onboarding switches the theme everywhere, including trophy rooms. |
| P5 | Medium | **Trophy cabinet and cups shelf.** The brief asked for realistic cabinets that change by sport and by wins. I did not find a dedicated cabinet component in the file list. To confirm. |
| P6 | Medium | **Memory-node movement.** You said nodes on the ground could not move. The player-walking-through-nodes feature should be checked in `memory-ground.html` (2,200 lines). To confirm. |
| P7 | Medium | **No media pipeline.** Videos and images are uploaded as raw files. No size limits per user, no thumbnails, no video transcoding, no storage cleanup when a memory is deleted. To confirm. |
| P8 | Medium | **Family circle sharing** (invite codes, grants) exists, but I did not see expiry on invite codes or a way for the owner to review what each person sees. To confirm. |
| P9 | Low | **No accessibility pass.** No evidence of keyboard navigation, focus states, reduced-motion handling, or text alternatives for the 3D scenes. To confirm. |
| P10 | Low | **Mobile and low-power devices.** Large WebGL scenes plus a 13,000-line page are likely heavy on phones. No low-quality mode seen. To confirm. |

## 5. Testing and operations

| # | Severity | Problem | Detail |
|---|---|---|---|
| T1 | High | **No automated test run.** Test files exist (`Backend/test*.js`, `AI_Modules/test_*.js`, `Frontend/test-suite.html`) but there is no CI workflow in the repo, and `test:ai` and `backend:test` must be run by hand. |
| T2 | Medium | **Tests do not cover the main risks.** The names suggest end-to-end, family vault and SRS audit tests, but none can catch S1-S3 because there is no real auth to test against. |
| T3 | Medium | **No logging or monitoring.** Errors go to `console.error`. No request IDs, no structured logs, no alerting. |
| T4 | Medium | **Deployment is only partly defined.** A `Dockerfile` and `.dockerignore` exist, but no `docker-compose` for backend + MongoDB + AI service, and no health check beyond `/api/health`. |
| T5 | Low | **No backup plan for SQLite or uploads.** The `.env.example` mentions a persistent disk, but not backups. |

---

## Suggested order of work

1. **S1, S2, S3, S4, S5, S7** (auth and vault). Everything else is unsafe until these are done.
2. **S6, S10** (secrets). Refuse to start without a real key; one client ID.
3. **R1, R2, R3** (repo cleanup). Remove `node_modules`, keep one copy of each page and model.
4. **S8, S9** (real OTP, protected uploads).
5. **A3, A4, A5** (one source of truth, one start command).
6. **P1, P2** (talking Younger Self with cited memories).
7. **A1, A2, T1** (split the big files, add CI).
8. The rest as time allows.
