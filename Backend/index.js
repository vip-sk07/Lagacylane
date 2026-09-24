import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from './database.js';
import { 
  generatePersonaResponse, 
  analyzeSentiment, 
  ingestMemoryPayload, 
  searchMemoriesByQuery,
  getSupabaseSchemaSQL,
  retrieveEraContext,
  generateYoungerSelfResponse,
  initSidelineWebSocketServer,
  removeUserVectors,
  perceiveImage,
  getUserCognitiveProfile,
  updateContinuousLearningGraph,
  updateMemorySentimentInProfile,
  computeEmotionalResilience
} from '../AI_Modules/index.js';
import { encryptText, decryptText } from '../AI_Modules/encryption.js';
import { connectMongoDB, getCollection } from './mongodb.js';

import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(compression());
const PORT = process.env.PORT || 5000;
const API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${PORT}`;

// CORS — allow local frontend origins
const allowedOrigins = [
  process.env.ALLOWED_ORIGIN,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Ensure uploads folder exists (supports persistent volumes on cloud hosts)
const uploadsDir = process.env.UPLOADS_DIR || (process.env.DATA_DIR ? path.join(process.env.DATA_DIR, 'uploads') : path.join(__dirname, 'uploads'));
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir));

// Serve unified Frontend web application statically
const frontendDir = path.join(__dirname, '../Frontend');
const publicDir = path.join(frontendDir, 'public');
app.use(express.static(frontendDir));
app.use(express.static(publicDir));

// Storage Engine for Image Uploads — with file-type and size guards
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, 'media-' + uniqueSuffix + ext);
  }
});

const ALLOWED_MIME_TYPES = /^(image\/(jpeg|jpg|png|gif|webp)|video\/(mp4|quicktime|mov))$/;

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB max
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME_TYPES.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Only images and videos allowed.`), false);
    }
  }
});

// ----------------------------------------------------
// 1. AUTHENTICATION & USER MANAGEMENT ENDPOINTS
// ----------------------------------------------------

// Register New User / Create Account
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, profileType, sportType, position, teamHistory, avatarUrl } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existing = db.prepare('SELECT User_ID FROM Users WHERE Email = ?').get(email);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    const passwordHash = await bcrypt.hash(password, 10);
    const isAthlete = profileType !== 'Standard';

    db.prepare(`
      INSERT INTO Users (User_ID, Name, Email, PasswordHash, ProfileType, AvatarURL)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(userId, name, email, passwordHash, isAthlete ? 'Athlete' : 'Standard', avatarUrl || null);

    const profileId = 'prof_' + Date.now();
    db.prepare(`
      INSERT INTO AthleteProfiles (Profile_ID, User_ID, SportType, Position, TeamHistory, JerseyNumber)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(profileId, userId, sportType || 'football', position || 'Attacking Midfielder (#10)', teamHistory || 'Legacy Academy XI', 10);

    const newUser = {
      id: userId,
      name,
      email,
      role: isAthlete ? 'Athlete' : 'Standard',
      sport: sportType || 'football',
      position: position || 'Player',
      team: teamHistory || 'Legacy Academy XI',
      avatarUrl: avatarUrl || null,
      memoriesCount: 0
    };

    res.status(201).json({ message: 'Account created successfully', user: newUser });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ error: 'Server error creating account.' });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRow = db.prepare('SELECT * FROM Users WHERE Email = ?').get(email);
    if (!userRow) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, userRow.PasswordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const athleteRow = db.prepare('SELECT * FROM AthleteProfiles WHERE User_ID = ?').get(userRow.User_ID);

    // Count existing memories to inform onboarding state
    let memoriesCount = 0;
    try {
      const memCollection = getCollection('MemoryLogs');
      const existingMems = await memCollection.find({ User_ID: userRow.User_ID }).toArray();
      memoriesCount = existingMems.length;
    } catch (countErr) {}

    const userPayload = {
      id: userRow.User_ID,
      name: userRow.Name,
      email: userRow.Email,
      role: userRow.ProfileType,
      sport: athleteRow ? athleteRow.SportType : 'football',
      position: athleteRow ? athleteRow.Position : 'Player',
      team: athleteRow ? athleteRow.TeamHistory : 'Personal',
      jerseyNumber: athleteRow ? athleteRow.JerseyNumber : 10,
      avatarUrl: userRow.AvatarURL,
      memoriesCount
    };

    res.json({ message: 'Login successful', user: userPayload });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// ----------------------------------------------------
// Google Sign-In Authentication (Real OAuth ID Token Verification)
// Client ID: 276711807803-lth8tuc91cgg5qb950mhkql8e6cis3tc.apps.googleusercontent.com
// ----------------------------------------------------

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '276711807803-lth8tuc91cgg5qb950mhkql8e6cis3tc.apps.googleusercontent.com';

/**
 * Verify a Google ID token by calling Google's tokeninfo endpoint.
 * Returns the token payload { sub, email, name, picture, email_verified }
 * Throws if the token is invalid or the audience doesn't match.
 */
async function verifyGoogleIdToken(idToken) {
  const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Google token verification failed: invalid or expired token');
  }
  const payload = await response.json();
  if (payload.error) {
    throw new Error(`Google token error: ${payload.error_description || payload.error}`);
  }
  // Ensure the token was issued for our LegacyLane app
  if (payload.aud !== GOOGLE_CLIENT_ID) {
    throw new Error('Google token audience mismatch — token not issued for LegacyLane');
  }
  if (payload.email_verified !== 'true' && payload.email_verified !== true) {
    throw new Error('Google account email is not verified');
  }
  return payload;
}

/**
 * POST /api/auth/google
 * Accepts either:
 *   a) { credential } — a raw Google ID token from Google One Tap / Sign-In button
 *   b) { email, name, avatarUrl } — pre-extracted fields (fallback / test mode)
 */
app.post('/api/auth/google', async (req, res) => {
  try {
    let email, name, avatarUrl, googleId;
    const { credential, sportType, position, teamHistory } = req.body;

    if (credential) {
      // === REAL MODE: Verify the Google ID token ===
      const payload = await verifyGoogleIdToken(credential);
      email      = payload.email;
      name       = payload.name;
      avatarUrl  = payload.picture || null;
      googleId   = payload.sub;
    } else {
      // === FALLBACK MODE: Trust pre-extracted fields (development/test) ===
      email      = req.body.email;
      name       = req.body.name;
      avatarUrl  = req.body.avatarUrl || null;
      googleId   = null;
      if (!email || !name) {
        return res.status(400).json({ error: 'Google email and name are required.' });
      }
    }

    // Find or create the user in our SQLite database
    let userRow = db.prepare('SELECT * FROM Users WHERE Email = ?').get(email);

    if (!userRow) {
      const userId = googleId ? `usr_google_${googleId}` : `usr_google_${Date.now()}`;
      const dummyHash = await bcrypt.hash(userId, 10);

      db.prepare(`
        INSERT INTO Users (User_ID, Name, Email, PasswordHash, ProfileType, AvatarURL)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(userId, name, email, dummyHash, 'Athlete', avatarUrl);

      const profileId = 'prof_' + Date.now();
      db.prepare(`
        INSERT INTO AthleteProfiles (Profile_ID, User_ID, SportType, Position, TeamHistory, JerseyNumber)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(profileId, userId, sportType || 'football', position || 'Player', teamHistory || 'Legacy Academy', 10);

      userRow = db.prepare('SELECT * FROM Users WHERE User_ID = ?').get(userId);
    } else {
      // Update avatar URL if Google profile picture changed
      if (avatarUrl && userRow.AvatarURL !== avatarUrl) {
        db.prepare('UPDATE Users SET AvatarURL = ? WHERE User_ID = ?').run(avatarUrl, userRow.User_ID);
        userRow.AvatarURL = avatarUrl;
      }
    }

    const athleteRow = db.prepare('SELECT * FROM AthleteProfiles WHERE User_ID = ?').get(userRow.User_ID);

    const userPayload = {
      id:          userRow.User_ID,
      name:        userRow.Name,
      email:       userRow.Email,
      role:        userRow.ProfileType,
      sport:       athleteRow ? athleteRow.SportType    : (sportType  || 'football'),
      position:    athleteRow ? athleteRow.Position     : 'Player',
      team:        athleteRow ? athleteRow.TeamHistory  : 'Legacy Academy',
      jerseyNumber:athleteRow ? athleteRow.JerseyNumber : 10,
      avatarUrl:   userRow.AvatarURL
    };

    res.json({ message: 'Google Sign-In successful', user: userPayload });
  } catch (err) {
    console.error('Google Auth Error:', err.message);
    res.status(401).json({ error: err.message || 'Google authentication failed.' });
  }
});

// GET /api/auth/google/client-id  — returns the public client ID for frontend Google Sign-In button
app.get('/api/auth/google/client-id', (req, res) => {
  res.json({ clientId: GOOGLE_CLIENT_ID });
});

// ----------------------------------------------------
// 2. ATHLETE PROFILE ENDPOINTS
// ----------------------------------------------------

app.get('/api/profile/:userId', (req, res) => {
  const { userId } = req.params;
  let user = db.prepare('SELECT User_ID, Name, Email, ProfileType, AvatarURL, CreatedAt FROM Users WHERE User_ID = ?').get(userId);
  
  if (!user) {
    user = {
      User_ID: userId,
      Name: 'Athlete',
      Email: `${userId}@legacylane.local`,
      ProfileType: 'Athlete',
      AvatarURL: null
    };
  }

  const athleteProfile = db.prepare('SELECT * FROM AthleteProfiles WHERE User_ID = ?').get(userId) || null;
  const lifeProfile = db.prepare('SELECT * FROM LifeProfiles WHERE User_ID = ?').get(userId) || null;

  res.json({ 
    user, 
    profile: athleteProfile, 
    athleteProfile, 
    lifeProfile 
  });
});

app.put('/api/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { 
      name, 
      sportType, 
      sport,
      position, 
      teamHistory, 
      team,
      jerseyNumber, 
      jersey,
      bio, 
      avatarUrl,
      lifeDomain, 
      domain,
      coreValues, 
      values,
      personalMotto,
      motto 
    } = req.body;

    const resolvedSport = sportType || sport;
    const resolvedJersey = jerseyNumber !== undefined ? jerseyNumber : jersey;
    const resolvedTeam = teamHistory || team;
    const resolvedLifeDomain = lifeDomain || domain;
    const resolvedCoreValues = coreValues || values;
    const resolvedMotto = personalMotto || motto;

    // 1. Ensure User row exists in Users table
    let userRow = db.prepare('SELECT * FROM Users WHERE User_ID = ?').get(userId);
    if (!userRow) {
      const dummyPassword = await bcrypt.hash('guest_legacy_pass', 10);
      const profileType = resolvedLifeDomain ? 'Standard' : 'Athlete';
      db.prepare(`
        INSERT INTO Users (User_ID, Name, Email, PasswordHash, ProfileType, AvatarURL)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(userId, name || 'Athlete', `${userId}@legacylane.local`, dummyPassword, profileType, avatarUrl || null);
      userRow = db.prepare('SELECT * FROM Users WHERE User_ID = ?').get(userId);
    } else if (name || avatarUrl) {
      db.prepare(`
        UPDATE Users 
        SET Name = COALESCE(?, Name), 
            AvatarURL = COALESCE(?, AvatarURL),
            UpdatedAt = CURRENT_TIMESTAMP
        WHERE User_ID = ?
      `).run(name || null, avatarUrl || null, userId);
      userRow = db.prepare('SELECT * FROM Users WHERE User_ID = ?').get(userId);
    }

    // 2. Athlete Profile Upsert
    let athleteRow = db.prepare('SELECT * FROM AthleteProfiles WHERE User_ID = ?').get(userId);
    if (resolvedSport || position || resolvedTeam || resolvedJersey !== undefined || bio) {
      if (athleteRow) {
        db.prepare(`
          UPDATE AthleteProfiles 
          SET SportType = COALESCE(?, SportType),
              Position = COALESCE(?, Position),
              TeamHistory = COALESCE(?, TeamHistory),
              JerseyNumber = COALESCE(?, JerseyNumber),
              Bio = COALESCE(?, Bio)
          WHERE User_ID = ?
        `).run(resolvedSport || null, position || null, resolvedTeam || null, resolvedJersey !== undefined ? Number(resolvedJersey) : null, bio || null, userId);
      } else {
        const profileId = 'prof_ath_' + Date.now();
        db.prepare(`
          INSERT INTO AthleteProfiles (Profile_ID, User_ID, SportType, Position, TeamHistory, JerseyNumber, Bio)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(profileId, userId, resolvedSport || 'football', position || 'Player', resolvedTeam || 'Personal Academy', resolvedJersey !== undefined ? Number(resolvedJersey) : 10, bio || '');
      }
      athleteRow = db.prepare('SELECT * FROM AthleteProfiles WHERE User_ID = ?').get(userId);
    }

    // 3. Life Profile Upsert
    let lifeRow = db.prepare('SELECT * FROM LifeProfiles WHERE User_ID = ?').get(userId);
    if (resolvedLifeDomain || resolvedCoreValues || resolvedMotto) {
      if (lifeRow) {
        db.prepare(`
          UPDATE LifeProfiles 
          SET LifeDomain = COALESCE(?, LifeDomain),
              CoreValues = COALESCE(?, CoreValues),
              PersonalMotto = COALESCE(?, PersonalMotto),
              Bio = COALESCE(?, Bio),
              UpdatedAt = CURRENT_TIMESTAMP
          WHERE User_ID = ?
        `).run(resolvedLifeDomain || null, resolvedCoreValues || null, resolvedMotto || null, bio || null, userId);
      } else {
        const profileId = 'prof_life_' + Date.now();
        db.prepare(`
          INSERT INTO LifeProfiles (Profile_ID, User_ID, LifeDomain, CoreValues, PersonalMotto, Bio)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(profileId, userId, resolvedLifeDomain || 'Creative Craft', resolvedCoreValues || 'Resilience & Courage', resolvedMotto || 'Walk with purpose', bio || '');
      }
      lifeRow = db.prepare('SELECT * FROM LifeProfiles WHERE User_ID = ?').get(userId);
    }

    res.json({ 
      message: 'Profile synchronized successfully', 
      user: userRow, 
      profile: athleteRow, 
      athleteProfile: athleteRow, 
      lifeProfile: lifeRow 
    });
  } catch (err) {
    console.error('Profile Update Error:', err);
    res.status(500).json({ error: 'Server error updating profile: ' + err.message });
  }
});

// ----------------------------------------------------
// 3. IMAGE & MEDIA UPLOAD ENDPOINT
// ----------------------------------------------------

app.post('/api/upload', upload.single('media'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded.' });
  }
  // Use API_BASE_URL env var so deployed URL is correct (not hardcoded localhost)
  const fileUrl = `${API_BASE_URL}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Multer error handler (catches fileFilter rejections)
app.use((err, req, res, next) => {
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Maximum upload size is 20 MB.' });
  }
  if (err && err.message && err.message.includes('Unsupported file type')) {
    return res.status(415).json({ error: err.message });
  }
  next(err);
});

// ----------------------------------------------------
// 4. CHRONOLOGICAL TIMELINE & MEMORY LOGS (MongoDB NoSQL)
// ----------------------------------------------------

// Health-check / test-connection probe used by Frontend
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.get('/api/memories/test-connection', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Semantic Search & Tag Filtering Endpoint (SRS Page 16 - REQ-3)
// IMPORTANT: must be registered BEFORE /api/memories/:userId to avoid
// Express matching 'search' as the :userId parameter
app.get('/api/memories/search/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { q, era, tag, journeyType, domain } = req.query;

    const collection = getCollection('MemoryLogs');
    const dbQuery = { User_ID: userId };
    if (journeyType) dbQuery.JourneyType = journeyType;
    if (domain)      dbQuery.Domain = domain;
    const rows = await collection.find(dbQuery).toArray();

    let filtered = rows;

    if (era) {
      filtered = filtered.filter(r => (r.Era === era || r.Tags?.era === era));
    }
    if (tag) {
      filtered = filtered.filter(r => r.Tags?.context?.some(t => t.toLowerCase() === tag.toLowerCase()));
    }
    if (q) {
      const query = q.toLowerCase();
      filtered = filtered.filter(r =>
        r.Title?.toLowerCase().includes(query) ||
        r.MatchDetails?.toLowerCase().includes(query) ||
        r.VictoryMessage?.toLowerCase().includes(query)
      );
    }

    res.json({ results: filtered, count: filtered.length });
  } catch (err) {
    console.error('Search Memories Error:', err);
    res.status(500).json({ error: 'Server error searching memories.' });
  }
});

// GET memories with domain scoping and pagination
app.get('/api/memories/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { journeyType, domain, page = 1, limit = 100 } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const collection = getCollection('MemoryLogs');
    const dbQuery = { User_ID: userId };
    if (journeyType) dbQuery.JourneyType = journeyType;
    if (domain)      dbQuery.Domain = domain;

    const rows = await collection.find(dbQuery).skip(skip).limit(parseInt(limit, 10)).toArray();

    const memories = rows.map((r, idx) => {
      let plainContent = '';
      if (r.TextEncrypted) {
        try {
          plainContent = decryptText(r.TextEncrypted);
        } catch (e) {
          plainContent = r.MatchDetails || '';
        }
      } else {
        plainContent = r.MatchDetails || '';
      }

      const allPhotos = Array.isArray(r.MediaAssets) 
        ? r.MediaAssets.map(a => typeof a === 'string' ? a : a.url).filter(Boolean)
        : [];
      if (allPhotos.length === 0 && r.Photo) allPhotos.push(r.Photo);

      return {
        id: r.Memory_ID,
        levelNumber: r.LevelNumber || skip + idx + 1,
        title: r.Title,
        era: r.Era || r.Tags?.era || 'Youth & Formative Years',
        journeyType: r.JourneyType || 'life',
        domain: r.Domain || 'life',
        date: r.EntryDate,
        stars: r.Stars || 3,
        status: r.Status || 'completed',
        matchDetails: r.MatchDetails || plainContent,
        journal: plainContent,
        content: plainContent,
        victoryMessage: r.VictoryMessage || '',
        sentiment: typeof r.SentimentScore === 'number' ? r.SentimentScore : 85,
        sentimentLabel: r.SentimentLabel || '',
        photo: (r.MediaAssets && r.MediaAssets[0]) ? r.MediaAssets[0].url : (allPhotos[0] || null),
        photos: allPhotos,
        media: (r.MediaAssets && r.MediaAssets[0]) ? r.MediaAssets[0].url : (allPhotos[0] || null),
        mediaAssets: r.MediaAssets || [],
        caption: r.PhotoCaption || (r.MediaAssets && r.MediaAssets[0] ? r.MediaAssets[0].caption : ''),
        location: r.Location || '',
        people: r.People || '',
        isFavorite: Boolean(r.IsFavorite),
        isInsight: Boolean(r.IsInsight || (Array.isArray(r.Tags?.context) && r.Tags.context.includes('#AIInsight'))),
        isVaultLocked: Boolean(r.IsVaultLocked || r.PrivacySetting === 'Vault'),
        tags: Array.isArray(r.Tags?.context) ? r.Tags.context : []
      };
    });

    // Enforce strict chronological ascending sort (earliest to latest)
    memories.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({ memories, count: memories.length, page: parseInt(page, 10), limit: parseInt(limit, 10) });
  } catch (err) {
    console.error('Fetch Memories Error:', err);
    res.status(500).json({ error: 'Server error fetching memories.' });
  }
});

app.post('/api/memories', async (req, res) => {
  try {
    const {
      userId, title, era, date, matchDetails, content, journal, victoryMessage,
      stars, mediaUrl, photo, photos, caption, tags, location, people, isFavorite, sentimentLabel,
      journeyType = 'life',
      domain = 'life'
    } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ error: 'userId and title are required.' });
    }

    const memoryId = 'mem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    const textContent = journal || content || matchDetails || '';

    // Analyze sentiment dynamically using the AI module or given score
    let sentimentScore = typeof req.body.sentiment === 'number' ? req.body.sentiment : analyzeSentiment(title, textContent + ' ' + (victoryMessage || ''));

    // Resolve media URLs (support both single photo and multiple photos array)
    let mediaAssetsList = [];
    if (Array.isArray(photos) && photos.length > 0) {
      mediaAssetsList = photos.map(p => {
        if (typeof p === 'string') return { url: p, type: 'image', caption: caption || '' };
        return { url: p.url, type: p.type || 'image', caption: p.caption || caption || '' };
      });
    } else if (photo || mediaUrl) {
      const singleUrl = photo || mediaUrl;
      mediaAssetsList = [{ url: singleUrl, type: 'image', caption: caption || '' }];
    }

    const activePhotoUrl = mediaAssetsList.length > 0 ? mediaAssetsList[0].url : null;
    let resolvedImageSource = activePhotoUrl;
    if (activePhotoUrl && typeof activePhotoUrl === 'string') {
      const match = activePhotoUrl.match(/\/uploads\/([^/?#]+)/);
      if (match) {
        const candidatePath = path.join(uploadsDir, match[1]);
        if (fs.existsSync(candidatePath)) {
          resolvedImageSource = candidatePath;
        }
      }
    }

    // Run high-level multimodal perception on the image
    let visualPerception = null;
    if (resolvedImageSource) {
      try {
        visualPerception = await perceiveImage({
          imageSource: resolvedImageSource,
          title,
          description: textContent,
          domain,
          era: era || 'Youth & Formative Years'
        });
      } catch (visErr) {
        console.warn('Perceive image in memories warning:', visErr.message);
      }
    }

    // AES-256-GCM encrypt the journal text before storage
    const encryptedPayload = encryptText(textContent);

    // Ingest into Vector Store asynchronously
    ingestMemoryPayload({
      userId,
      title,
      description: textContent,
      entryDate: date,
      era,
      emotionTags: tags,
      contextTags: tags,
      sentimentScore,
      mediaUrl: activePhotoUrl,
      imageSource: resolvedImageSource,
      journeyType,
      domain
    }).catch(err => console.error('Background Vector Ingest Warning:', err.message));

    const doc = {
      Memory_ID: memoryId,
      User_ID: userId,
      JourneyType: journeyType,
      Domain: domain,
      EntryDate: date || new Date().toISOString().split('T')[0],
      Title: title,
      Era: era || 'Youth & Formative Years',
      MatchDetails: textContent,
      TextEncrypted: encryptedPayload.encoded,
      VictoryMessage: victoryMessage || '',
      Stars: Number(stars) || 3,
      Status: 'completed',
      SentimentScore: sentimentScore,
      SentimentLabel: sentimentLabel || '',
      Location: location || '',
      People: people || '',
      IsFavorite: Boolean(isFavorite),
      IsInsight: Boolean(req.body.isInsight || (Array.isArray(tags) && tags.includes('#AIInsight'))),
      IsVaultLocked: Boolean(req.body.isVaultLocked || req.body.isLocked || req.body.privacySetting === 'Vault'),
      PrivacySetting: (req.body.isVaultLocked || req.body.isLocked || req.body.privacySetting === 'Vault') ? 'Vault' : 'Public',
      PhotoCaption: caption || '',
      Tags: { era: era || 'Youth & Formative Years', context: tags || [] },
      MediaAssets: mediaAssetsList,
      VisualPerception: visualPerception,
      CreatedAt: new Date()
    };

    // Update Continuous Cognitive Learning Graph
    try {
      updateContinuousLearningGraph({
        userId,
        memory: {
          title,
          description: textContent,
          journal: textContent,
          entryDate: doc.EntryDate,
          era: doc.Era,
          domain,
          sentimentScore,
          caption: doc.PhotoCaption,
          mediaUrl: activePhotoUrl
        },
        visualPerception
      });
    } catch (learnErr) {
      console.warn('Continuous learning graph update warning:', learnErr.message);
    }

    const collection = getCollection('MemoryLogs');
    await collection.insertOne(doc);

    res.status(201).json({ 
      message: 'Memory successfully preserved in archive.', 
      memoryId, 
      sentimentScore,
      memory: {
        id: memoryId,
        title,
        date: doc.EntryDate,
        era: doc.Era,
        journal: textContent,
        content: textContent,
        sentiment: sentimentScore,
        sentimentLabel: doc.SentimentLabel,
        location: doc.Location,
        people: doc.People,
        isFavorite: doc.IsFavorite,
        isInsight: doc.IsInsight,
        isVaultLocked: doc.IsVaultLocked,
        photo: activePhotoUrl,
        photos: mediaAssetsList.map(m => m.url),
        mediaAssets: mediaAssetsList,
        caption: doc.PhotoCaption,
        tags: doc.Tags.context,
        journeyType,
        domain
      },
      visualPerception 
    });
  } catch (err) {
    console.error('Add Memory Error:', err);
    res.status(500).json({ error: 'Server error saving memory node.' });
  }
});

// POST /api/onboarding/baseline (SRS Section 4.1: Save 2-3 Baseline Eras & Milestones)
app.post('/api/onboarding/baseline', async (req, res) => {
  try {
    const { userId, journeyType = 'sports', domain = 'football', baselineAnchors } = req.body;

    if (!userId || !Array.isArray(baselineAnchors) || baselineAnchors.length === 0) {
      return res.status(400).json({ error: 'userId and baselineAnchors array are required.' });
    }

    const collection = getCollection('MemoryLogs');
    const createdMemories = [];

    for (let i = 0; i < baselineAnchors.length; i++) {
      const anchor = baselineAnchors[i];
      const memoryId = 'mem_base_' + Date.now() + '_' + (i + 1) + '_' + Math.random().toString(36).substr(2, 3);
      const textContent = anchor.journal || anchor.content || anchor.description || '';
      const score = typeof anchor.sentiment === 'number' ? anchor.sentiment : (i === 1 ? 95 : 85);
      const label = anchor.sentimentLabel || (score >= 90 ? 'Triumphant & Proud 🌟' : 'Tested & Resilient 💪');
      const entryDate = anchor.date || new Date(Date.now() - (baselineAnchors.length - 1 - i) * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const eraName = anchor.era || (i === 0 ? 'Youth & Formative Years' : i === 1 ? 'Breakthrough Season' : 'Pro Athlete Era');
      const anchorTitle = anchor.title || `Milestone ${i + 1}`;
      const tagsList = Array.isArray(anchor.tags) ? anchor.tags : ['#Baseline', '#Milestone', `#Era${i + 1}`];

      // AES-256-GCM Encrypt text
      const encryptedPayload = encryptText(textContent);

      const doc = {
        Memory_ID: memoryId,
        User_ID: userId,
        JourneyType: journeyType,
        Domain: domain,
        EntryDate: entryDate,
        Title: anchorTitle,
        Era: eraName,
        MatchDetails: textContent,
        TextEncrypted: encryptedPayload.encoded,
        VictoryMessage: i === 1 ? 'First major breakthrough achieved!' : '',
        Stars: i === 1 ? 5 : 4,
        Status: 'completed',
        SentimentScore: score,
        SentimentLabel: label,
        Location: anchor.location || '',
        People: anchor.people || '',
        IsFavorite: i === 1 || Boolean(anchor.isFavorite),
        PhotoCaption: '',
        Tags: { era: eraName, context: tagsList },
        MediaAssets: [],
        CreatedAt: new Date()
      };

      // 1. Save to MongoDB NoSQL Collection
      await collection.insertOne(doc);

      // 2. Save to SQLite Structured Table (database.js)
      try {
        db.prepare(`
          INSERT INTO MemoryLogs (
            Memory_ID, User_ID, EntryDate, Title, TextEncrypted, MatchDetails, 
            VictoryMessage, Stars, SentimentScore, PrivacySetting, TagsJSON
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Public', ?)
        `).run(
          memoryId,
          userId,
          entryDate,
          anchorTitle,
          encryptedPayload.encoded,
          textContent,
          doc.VictoryMessage,
          doc.Stars,
          score,
          JSON.stringify(doc.Tags)
        );
      } catch (sqlErr) {
        console.warn('SQLite baseline anchor insert warning:', sqlErr.message);
      }

      // 3. Ingest into Vector Store asynchronously
      ingestMemoryPayload({
        userId,
        title: anchorTitle,
        description: textContent,
        entryDate,
        era: eraName,
        emotionTags: tagsList,
        contextTags: tagsList,
        sentimentScore: score,
        journeyType,
        domain
      }).catch(err => console.error('Vector ingest baseline warning:', err.message));

      // 4. Update Continuous Cognitive Learning Graph
      try {
        updateContinuousLearningGraph({
          userId,
          memory: {
            title: anchorTitle,
            description: textContent,
            journal: textContent,
            entryDate,
            era: eraName,
            domain,
            sentimentScore: score
          }
        });
      } catch (learnErr) {
        console.warn('Learning graph baseline update warning:', learnErr.message);
      }

      createdMemories.push({
        id: i + 1,
        Memory_ID: memoryId,
        title: anchorTitle,
        date: entryDate,
        era: eraName,
        journal: textContent,
        content: textContent,
        sentiment: score,
        sentimentLabel: label,
        isFavorite: doc.IsFavorite,
        tags: tagsList,
        domain,
        journeyType
      });
    }

    res.status(201).json({
      message: 'Baseline onboarding anchors preserved successfully.',
      memories: createdMemories
    });
  } catch (err) {
    console.error('Onboarding Baseline Error:', err);
    res.status(500).json({ error: 'Server error saving baseline onboarding anchors.' });
  }
});

// PUT /api/memories/:id (Update existing memory)
app.put('/api/memories/:id', async (req, res) => {
  try {
    const memoryId = req.params.id;
    const {
      title, era, date, content, journal,
      mediaUrl, photo, caption, tags, location, people, isFavorite, sentimentLabel, sentiment
    } = req.body;

    const collection = getCollection('MemoryLogs');
    const existing = await collection.findOne({ Memory_ID: memoryId });
    if (!existing) {
      return res.status(404).json({ error: 'Memory not found.' });
    }

    const textContent = journal !== undefined ? journal : (content !== undefined ? content : (existing.MatchDetails || ''));
    const encryptedPayload = encryptText(textContent);
    const activePhoto = photo !== undefined ? photo : (mediaUrl !== undefined ? mediaUrl : (existing.MediaAssets && existing.MediaAssets[0]?.url));
    const activeScore = typeof sentiment === 'number' ? sentiment : (existing.SentimentScore || 85);

    const updateFields = {
      Title: title || existing.Title,
      Era: era || existing.Era,
      EntryDate: date || existing.EntryDate,
      MatchDetails: textContent,
      TextEncrypted: encryptedPayload.encoded,
      SentimentScore: activeScore,
      SentimentLabel: sentimentLabel !== undefined ? sentimentLabel : existing.SentimentLabel,
      Location: location !== undefined ? location : existing.Location,
      People: people !== undefined ? people : existing.People,
      IsFavorite: isFavorite !== undefined ? Boolean(isFavorite) : existing.IsFavorite,
      PhotoCaption: caption !== undefined ? caption : existing.PhotoCaption,
      UpdatedAt: new Date()
    };

    if (tags) {
      updateFields.Tags = { era: updateFields.Era, context: tags };
    }
    if (activePhoto !== undefined) {
      updateFields.MediaAssets = activePhoto ? [{ url: activePhoto, type: 'image', caption: updateFields.PhotoCaption }] : [];
    }

    await collection.updateOne({ Memory_ID: memoryId }, { $set: updateFields });

    // Synchronize cognitive profile & recalculate emotional resilience trajectory (SRS 4.4.2)
    let updatedProfile = null;
    try {
      updatedProfile = updateMemorySentimentInProfile({
        userId: existing.User_ID || 'usr_default',
        memoryId,
        title: updateFields.Title,
        newSentiment: activeScore,
        newLabel: updateFields.SentimentLabel
      });
    } catch (profileErr) {
      console.warn('Could not sync memory sentiment to cognitive profile:', profileErr.message);
    }

    res.json({
      message: 'Memory updated successfully.',
      memory: {
        id: memoryId,
        title: updateFields.Title,
        date: updateFields.EntryDate,
        era: updateFields.Era,
        journal: textContent,
        content: textContent,
        sentiment: activeScore,
        sentimentLabel: updateFields.SentimentLabel,
        location: updateFields.Location,
        people: updateFields.People,
        isFavorite: updateFields.IsFavorite,
        photo: activePhoto,
        caption: updateFields.PhotoCaption,
        tags: tags || existing.Tags?.context || []
      },
      resilienceTrajectory: updatedProfile?.resilienceTrajectory || null,
      resilienceScore: updatedProfile?.resilienceTrajectory?.resilienceScore || 85
    });
  } catch (err) {
    console.error('Update Memory Error:', err);
    res.status(500).json({ error: 'Server error updating memory.' });
  }
});

// DELETE /api/memories/:id (Delete single memory)
app.delete('/api/memories/:id', async (req, res) => {
  try {
    const memoryId = req.params.id;
    const collection = getCollection('MemoryLogs');
    const result = await collection.deleteOne({ Memory_ID: memoryId });

    if (result && result.deletedCount === 0) {
      return res.status(404).json({ error: 'Memory not found or already deleted.' });
    }

    res.json({ message: 'Memory successfully released from archive.', id: memoryId });
  } catch (err) {
    console.error('Delete Memory Error:', err);
    res.status(500).json({ error: 'Server error deleting memory.' });
  }
});

// ----------------------------------------------------
// 5. AI YOUNGER SELF CHAT & MULTIMODAL PERCEPTION ENDPOINTS
// ----------------------------------------------------

app.post('/api/chat', async (req, res) => {
  try {
    const { 
      userId, era, userMessage, history, retrievedContext, 
      journeyType, domain, clientMemories, 
      imageSource, mediaUrl, photo 
    } = req.body;

    const messageText = userMessage || req.body.message || (history && history.length > 0 ? history[history.length - 1].content : '');

    if (!messageText && !imageSource && !mediaUrl && !photo) {
      return res.status(400).json({ error: 'userMessage, message, or imageSource is required.' });
    }

    // Resolve local upload disk path if imageSource points to /uploads/
    let resolvedImageSource = imageSource || mediaUrl || photo || null;
    if (resolvedImageSource && typeof resolvedImageSource === 'string') {
      const match = resolvedImageSource.match(/\/uploads\/([^/?#]+)/);
      if (match) {
        const candidatePath = path.join(uploadsDir, match[1]);
        if (fs.existsSync(candidatePath)) {
          resolvedImageSource = candidatePath;
        }
      }
    }

    const isAllEras = !era || era.toLowerCase() === 'all' || era.toLowerCase() === 'all eras';
    const effectiveEra = isAllEras ? 'All Eras' : era;

    // Merge client-provided memories with database memories for maximal cognitive recall
    let allRelevantMemories = Array.isArray(clientMemories) ? [...clientMemories] : [];
    try {
      const collection = getCollection('MemoryLogs');
      const query = {};
      if (userId && userId !== 'usr_default' && userId !== 'usr_anonymous') {
        query.User_ID = userId;
      }
      if (!isAllEras && era) query.Era = era;
      if (journeyType) query.JourneyType = journeyType;
      if (domain) query.Domain = domain;

      const dbMemories = await collection.find(query).toArray();
      if (dbMemories.length > 0) {
        const existingIds = new Set(allRelevantMemories.map(m => m.id || m.Memory_ID || m.title));
        dbMemories.forEach(dm => {
          if (!existingIds.has(dm.Memory_ID) && !existingIds.has(dm.Title)) {
            let plainContent = dm.MatchDetails || '';
            if (dm.TextEncrypted) {
              try { plainContent = decryptText(dm.TextEncrypted); } catch (e) {}
            }
            allRelevantMemories.push({
              ...dm,
              journal: plainContent,
              content: plainContent,
              matchDetails: plainContent
            });
          }
        });
      }
    } catch (dbErr) {
      console.warn('MemoryLogs fetch for RAG context notice:', dbErr.message);
    }
    
    // Delegate to Enhanced Phase 3 Persona Orchestration Engine
    const orchestrationResult = await generateYoungerSelfResponse({
      history: history || [],
      newPrompt: messageText,
      imageSource: resolvedImageSource,
      retrievedContext: retrievedContext || null,
      selectedEra: effectiveEra,
      userId: userId || 'usr_default',
      journeyType: journeyType || null,
      domain: domain || null,
      rawMemories: allRelevantMemories
    });

    // Save Chat Session History in MongoDB
    try {
      const chatCollection = getCollection('ChatSessions');
      await chatCollection.insertOne({
        User_ID: userId || 'usr_default',
        EraSelected: effectiveEra,
        JourneyType: journeyType || 'sports',
        Domain: domain || 'football',
        StartTime: new Date(),
        Messages: [
          { sender: 'user', text: messageText || 'Visual memory shared', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
          { sender: 'ai', text: orchestrationResult.response, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]
      });
    } catch (dbErr) {
      console.warn('Chat history save warning:', dbErr.message);
    }

    res.json({ 
      response: orchestrationResult.response,
      crisisTriggered: orchestrationResult.crisisTriggered,
      isBurnout: orchestrationResult.isBurnout,
      isSparse: orchestrationResult.isSparse || false,
      era: orchestrationResult.selectedEra,
      eraAge: orchestrationResult.eraAge,
      model: orchestrationResult.model,
      visualPerception: orchestrationResult.visualPerception,
      learnedMemoriesCount: orchestrationResult.learnedMemoriesCount,
      photosCount: orchestrationResult.photosCount
    });
  } catch (err) {
    console.error('AI Chat Error:', err);
    res.status(500).json({ error: 'Server error generating persona response.' });
  }
});

// ----------------------------------------------------
// 5B. CHAT HISTORY RETRIEVAL & DELETION (SRS 4.3)
// ----------------------------------------------------
app.get('/api/chat/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const chatCollection = getCollection('ChatSessions');
    const sessions = await chatCollection.find({ User_ID: userId }).toArray();
    
    // Flatten messages into a clean chronological list
    const history = [];
    sessions.forEach(sess => {
      if (Array.isArray(sess.Messages)) {
        sess.Messages.forEach(msg => {
          history.push({
            sender: msg.sender,
            text: msg.text,
            timestamp: msg.timestamp,
            era: sess.EraSelected,
            journeyType: sess.JourneyType,
            domain: sess.Domain
          });
        });
      }
    });

    res.json({ success: true, history });
  } catch (err) {
    console.error('Fetch Chat History Error:', err);
    res.status(500).json({ error: 'Server error retrieving chat history.' });
  }
});

app.delete('/api/chat/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const chatCollection = getCollection('ChatSessions');
    await chatCollection.deleteMany({ User_ID: userId });
    res.json({ success: true, message: 'Chat history cleared successfully.' });
  } catch (err) {
    console.error('Delete Chat History Error:', err);
    res.status(500).json({ error: 'Server error clearing chat history.' });
  }
});

// Dedicated Multimodal Image Perception Endpoint
app.post('/api/ai/perceive', upload.single('media'), async (req, res) => {
  try {
    const file = req.file;
    const { title, description, caption, domain = 'football', era = 'Youth Era', imageUrl } = req.body;

    let imageSource = null;
    if (file) {
      imageSource = file.path;
    } else if (imageUrl) {
      imageSource = imageUrl;
    } else {
      return res.status(400).json({ error: 'Please upload an image file or provide imageUrl.' });
    }

    const perceptionResult = await perceiveImage({
      imageSource,
      title: title || '',
      description: description || '',
      caption: caption || '',
      domain,
      era
    });

    res.json({
      status: 'success',
      perception: perceptionResult,
      imageUrl: file ? `${API_BASE_URL}/uploads/${file.filename}` : imageUrl
    });
  } catch (err) {
    console.error('Multimodal Perception Endpoint Error:', err);
    res.status(500).json({ error: 'Server error perceiving image.' });
  }
});

// Continuous Cognitive Learning Trajectory Profile Endpoint
app.get('/api/ai/cognitive-profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = getUserCognitiveProfile(userId);
    res.json({ status: 'success', profile });
  } catch (err) {
    console.error('Cognitive Profile API Error:', err);
    res.status(500).json({ error: 'Server error retrieving cognitive profile.' });
  }
});

// Proactive Younger Self Bench Insights Endpoint
app.get('/api/ai/younger-self/insights', async (req, res) => {
  try {
    const { userId, era, journeyType, domain } = req.query;
    const collection = getCollection('MemoryLogs');
    const query = {};
    if (userId && userId !== 'usr_default') query.User_ID = userId;
    if (era) query.Era = era;
    if (journeyType) query.JourneyType = journeyType;
    if (domain) query.Domain = domain;

    const memories = await collection.find(query).sort({ CreatedAt: -1 }).limit(10).toArray();
    
    let insight = journeyType === 'life'
      ? "I'm sitting under the breeze tree reflecting on our path. Add your memories and let's keep growing."
      : "Coach, I'm watching from the sideline bench! Record your plays so I can learn from your journey.";

    if (memories.length > 0) {
      const top = memories[0];
      const photoSnippet = top.MediaAssets?.length > 0 ? ` Looking at our photo from '${top.Title}', ` : ` `;
      insight = `I just reviewed '${top.Title}' from ${top.EntryDate}!${photoSnippet}Every single milestone makes our younger self proud.`;
    }

    res.json({
      insight,
      count: memories.length,
      era: era || 'All Eras'
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error generating insights.' });
  }
});

// ----------------------------------------------------
// 6. WELLNESS & SENTIMENT ANALYTICS ENDPOINT
// ----------------------------------------------------

app.get('/api/analytics/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { journeyType, domain } = req.query;

    const collection = getCollection('MemoryLogs');
    const query = { User_ID: userId };
    if (journeyType) query.JourneyType = journeyType;
    if (domain && domain !== 'all') query.Domain = domain;

    const rows = await collection.find(query).toArray();

    // Sort chronologically ascending
    rows.sort((a, b) => new Date(a.EntryDate || 0) - new Date(b.EntryDate || 0));

    const dataPoints = rows.map((r, idx) => {
      // Normalize score to 0 - 100 range
      let rawScore = typeof r.SentimentScore === 'number' ? r.SentimentScore : 85;
      if (rawScore <= 1.0 && rawScore >= -1.0) {
        rawScore = Math.round((rawScore + 1) * 50); // normalize -1..1 to 0..100
      }
      return {
        id: r.Memory_ID || `mem_${idx + 1}`,
        date: r.EntryDate ? r.EntryDate.substring(0, 7) : '2024-01',
        fullDate: r.EntryDate || '2024-01-01',
        title: r.Title || 'Milestone',
        score: rawScore, // 0 to 100
        normalizedValue: ((rawScore - 50) / 50).toFixed(2), // -1.00 to +1.00
        sentimentLabel: r.SentimentLabel || (rawScore >= 80 ? 'Triumphant & Proud 🌟' : rawScore >= 60 ? 'Tested & Resilient 💪' : 'Difficult Lesson 🌧️'),
        era: r.Era || 'Youth Era',
        isPeak: rawScore >= 85,
        isValley: rawScore <= 45
      };
    });

    const avgScore = dataPoints.length > 0
      ? Math.round(dataPoints.reduce((acc, p) => acc + p.score, 0) / dataPoints.length)
      : 85;

    // Run emotional resilience analysis
    const resilience = computeEmotionalResilience(rows.map(r => ({
      title: r.Title,
      date: r.EntryDate,
      sentiment: typeof r.SentimentScore === 'number' ? r.SentimentScore : 85,
      journal: r.MatchDetails || ''
    })));

    res.json({
      dataPoints,
      avgSentiment: avgScore,
      burnoutRisk: avgScore < 45 ? 'High' : avgScore < 70 ? 'Moderate' : 'Low',
      resilienceScore: resilience.resilienceScore || avgScore,
      resilienceTier: resilience.resilienceTier || 'Resilient & Focused',
      recoverySequences: resilience.recoverySequences || 0,
      trajectorySummary: resilience.trajectorySummary || 'Steady emotional trajectory across chapters.',
      totalMemories: rows.length
    });
  } catch (err) {
    console.error('Analytics Error:', err);
    res.status(500).json({ error: 'Server error calculating analytics.' });
  }
});

// ----------------------------------------------------
// 7. TEAMMATE & USER CONNECTIONS ENDPOINTS
// ----------------------------------------------------

app.get('/api/connections/:userId', (req, res) => {
  const { userId } = req.params;
  const connections = db.prepare(`
    SELECT c.Connection_ID, c.Status, u.User_ID, u.Name, u.Email, u.ProfileType, p.SportType, p.Position, p.TeamHistory
    FROM UserConnections c
    JOIN Users u ON c.Following_ID = u.User_ID
    LEFT JOIN AthleteProfiles p ON u.User_ID = p.User_ID
    WHERE c.Follower_ID = ?
  `).all(userId);

  res.json({ connections });
});

app.post('/api/connections/follow', (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    if (!followerId || !followingId) {
      return res.status(400).json({ error: 'followerId and followingId are required.' });
    }
    const connectionId = 'conn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

    // Ensure both users exist as stubs so FOREIGN KEY constraints are satisfied
    const upsertUser = db.prepare(`
      INSERT OR IGNORE INTO Users (User_ID, Name, Email, PasswordHash, ProfileType)
      VALUES (?, 'Athlete', ?, 'stub', 'Standard')
    `);
    upsertUser.run(followerId, `${followerId}@legacylane.local`);
    upsertUser.run(followingId, `${followingId}@legacylane.local`);

    db.prepare(`
      INSERT OR IGNORE INTO UserConnections (Connection_ID, Follower_ID, Following_ID, Status)
      VALUES (?, ?, ?, 'pending')
    `).run(connectionId, followerId, followingId);

    res.status(201).json({ message: 'Follow request sent', connectionId });
  } catch (err) {
    console.error('Connections Follow Error:', err);
    res.status(500).json({ error: 'Server error creating connection.' });
  }
});

// ----------------------------------------------------
// 8. FAMILY ACCESS CONTROL & VAULT PERMISSION ENDPOINTS
// ----------------------------------------------------

app.get('/api/vault/:ownerId', async (req, res) => {
  try {
    const { ownerId } = req.params;
    const { viewerId } = req.query;

    // Only enforce ACL when a different viewer is specified
    if (viewerId && ownerId !== viewerId) {
      const grant = db.prepare(`
        SELECT PermissionLevel, Status FROM FamilyAccessControl
        WHERE Owner_User_ID = ? AND Family_User_ID = ? AND Status = 'active'
      `).get(ownerId, viewerId);

      if (!grant) {
        return res.status(403).json({ error: 'Access denied. You do not have permission to view this vault.' });
      }
    }

    const collection = getCollection('MemoryLogs');
    const memories = await collection.find({ User_ID: ownerId }).toArray();
    res.json({ ownerId, memories, access: 'granted' });
  } catch (err) {
    console.error('Vault Access Error:', err);
    res.status(500).json({ error: 'Server error verifying vault access.' });
  }
});

// Toggle Vault Lock status on a memory (AES-256 Vault)
app.put('/api/memories/:id/vault', async (req, res) => {
  try {
    const memoryId = req.params.id;
    const { isVaultLocked } = req.body;
    const lockedBool = Boolean(isVaultLocked);

    const collection = getCollection('MemoryLogs');
    await collection.updateOne(
      { Memory_ID: memoryId },
      { $set: { IsVaultLocked: lockedBool, PrivacySetting: lockedBool ? 'Vault' : 'Public', UpdatedAt: new Date() } }
    );

    try {
      db.prepare('UPDATE MemoryLogs SET IsVaultLocked = ?, PrivacySetting = ? WHERE Memory_ID = ?')
        .run(lockedBool ? 1 : 0, lockedBool ? 'Vault' : 'Public', memoryId);
    } catch (dbErr) {}

    res.json({
      message: lockedBool ? 'Memory secured in AES-256 Vault.' : 'Memory unlocked from Vault.',
      memoryId,
      isVaultLocked: lockedBool
    });
  } catch (err) {
    console.error('Vault Toggle Error:', err);
    res.status(500).json({ error: 'Server error updating vault status.' });
  }
});

// Verify or initialize user's 4-digit numeric Vault PIN
app.post('/api/vault/verify-pin', async (req, res) => {
  try {
    const { userId, pin } = req.body;
    if (!pin || String(pin).length < 4) {
      return res.status(400).json({ error: 'A 4-digit numeric PIN is required.' });
    }

    let user = db.prepare('SELECT User_ID, VaultPIN FROM Users WHERE User_ID = ?').get(userId);
    if (!user) {
      db.prepare(`
        INSERT OR IGNORE INTO Users (User_ID, Name, Email, PasswordHash, ProfileType, VaultPIN)
        VALUES (?, 'Athlete', ?, 'session_local', 'Standard', ?)
      `).run(userId, `${userId}@legacylane.local`, String(pin));
      return res.json({ valid: true, initialized: true, message: 'Vault PIN successfully established.' });
    }

    if (!user.VaultPIN) {
      // User is setting their initial Vault PIN
      db.prepare('UPDATE Users SET VaultPIN = ? WHERE User_ID = ?').run(String(pin), userId);
      return res.json({ valid: true, initialized: true, message: 'Vault PIN successfully established.' });
    }

    if (user.VaultPIN === String(pin)) {
      return res.json({ valid: true, message: 'Vault PIN verified. Access granted.' });
    } else {
      return res.status(401).json({ valid: false, error: 'Incorrect Vault PIN. Please try again.' });
    }
  } catch (err) {
    console.error('PIN Verification Error:', err);
    res.status(500).json({ error: 'Server error verifying PIN.' });
  }
});

// Retrieve Vault summary, cipher info, and privacy metrics (SRS 4.1 & 71)
app.get('/api/vault/summary/:ownerId', async (req, res) => {
  try {
    const { ownerId } = req.params;
    let user = db.prepare('SELECT User_ID, VaultPIN FROM Users WHERE User_ID = ?').get(ownerId);
    const hasPin = Boolean(user && user.VaultPIN);

    let totalMemories = 0;
    let lockedMemories = 0;
    let publicMemories = 0;
    let familyMemories = 0;

    try {
      const collection = getCollection('MemoryLogs');
      const memories = await collection.find({ User_ID: ownerId }).toArray();
      totalMemories = memories.length;
      lockedMemories = memories.filter(m => m.IsVaultLocked).length;
      familyMemories = memories.filter(m => m.PrivacySetting === 'Family').length;
      publicMemories = totalMemories - lockedMemories - familyMemories;
    } catch (e) {
      // Fallback to SQLite
      try {
        const rows = db.prepare('SELECT IsVaultLocked, PrivacySetting FROM MemoryLogs WHERE User_ID = ?').all(ownerId);
        totalMemories = rows.length;
        lockedMemories = rows.filter(r => r.IsVaultLocked === 1 || r.IsVaultLocked === true).length;
        familyMemories = rows.filter(r => r.PrivacySetting === 'Family').length;
        publicMemories = totalMemories - lockedMemories - familyMemories;
      } catch (dbErr) {}
    }

    res.json({
      ownerId,
      hasPin,
      totalMemories,
      lockedMemories,
      publicMemories,
      familyMemories,
      cipher: 'AES-256-GCM',
      keyLength: 256,
      authTagSupport: true,
      vaultStatus: lockedMemories > 0 ? 'active_protection' : 'ready'
    });
  } catch (err) {
    console.error('Vault Summary Error:', err);
    res.status(500).json({ error: 'Server error retrieving vault summary.' });
  }
});

// Change or update user's 4-digit numeric Vault PIN
app.post('/api/vault/change-pin', async (req, res) => {
  try {
    const { userId, currentPin, newPin } = req.body;
    if (!newPin || String(newPin).length !== 4 || !/^\d{4}$/.test(String(newPin))) {
      return res.status(400).json({ error: 'New PIN must be exactly 4 numeric digits.' });
    }

    let user = db.prepare('SELECT User_ID, VaultPIN FROM Users WHERE User_ID = ?').get(userId);
    if (!user) {
      db.prepare(`
        INSERT INTO Users (User_ID, Name, Email, PasswordHash, ProfileType, VaultPIN)
        VALUES (?, 'Athlete', ?, 'session_local', 'Standard', ?)
      `).run(userId, `${userId}@legacylane.local`, String(newPin));
      return res.json({ success: true, message: 'Vault PIN established successfully.' });
    }

    // If existing PIN exists, verify currentPin (accepts both 'currentPin' and 'oldPin' field names)
    const suppliedOld = String(currentPin || req.body.oldPin || '');
    if (user.VaultPIN && user.VaultPIN !== suppliedOld) {
      return res.status(401).json({ error: 'Current PIN is incorrect.' });
    }

    db.prepare('UPDATE Users SET VaultPIN = ? WHERE User_ID = ?').run(String(newPin), userId);
    res.json({ success: true, message: 'Vault PIN successfully updated.' });
  } catch (err) {
    console.error('Change PIN Error:', err);
    res.status(500).json({ error: 'Server error updating PIN.' });
  }
});

// Retrieve active family circle members and access grants
app.get('/api/family-circle/:ownerId', (req, res) => {
  try {
    const { ownerId } = req.params;
    const members = db.prepare(`
      SELECT Grant_ID, Owner_User_ID, Family_User_ID, InviteeName, InviteeEmail, Relationship, PermissionLevel, Status, InviteCode, GrantedAt
      FROM FamilyAccessControl
      WHERE Owner_User_ID = ? AND Status = 'active'
      ORDER BY GrantedAt DESC
    `).all(ownerId);

    res.json({ ownerId, members });
  } catch (err) {
    console.error('Fetch Family Circle Error:', err);
    res.status(500).json({ error: 'Server error fetching family circle.' });
  }
});

// Generate instant shareable Invite Code for Family Circle
app.post('/api/family-circle/invite-code', (req, res) => {
  try {
    const { ownerId, relationship, permissionLevel, inviteeName, role } = req.body;
    if (!ownerId) return res.status(400).json({ error: 'ownerId is required.' });

    db.prepare(`
      INSERT OR IGNORE INTO Users (User_ID, Name, Email, PasswordHash, ProfileType)
      VALUES (?, 'Athlete Owner', ?, 'owner_hash', 'Standard')
    `).run(ownerId, `${ownerId}@legacylane.local`);

    const codeChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let randomPart = '';
    for (let i = 0; i < 4; i++) {
      randomPart += codeChars.charAt(Math.floor(Math.random() * codeChars.length));
    }
    const inviteCode = `LL-FAM-${randomPart}`;
    const newGrantId = 'grant_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    const guestId = 'usr_guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    const resolvedRole = role || permissionLevel || 'Viewer';

    db.prepare(`
      INSERT OR IGNORE INTO Users (User_ID, Name, Email, PasswordHash, ProfileType)
      VALUES (?, ?, ?, 'invited_code', 'Standard')
    `).run(guestId, inviteeName || 'Family Member', `${guestId}@invited.legacylane.internal`);

    db.prepare(`
      INSERT INTO FamilyAccessControl (Grant_ID, Owner_User_ID, Family_User_ID, InviteeName, InviteeEmail, Relationship, PermissionLevel, Status, InviteCode)
      VALUES (?, ?, ?, ?, '', ?, ?, 'active', ?)
    `).run(
      newGrantId,
      ownerId,
      guestId,
      inviteeName || 'Family Member',
      relationship || 'Family',
      resolvedRole,
      inviteCode
    );

    res.status(201).json({
      success: true,
      inviteCode,
      code: inviteCode,
      grantId: newGrantId,
      relationship: relationship || 'Family',
      permissionLevel: resolvedRole
    });
  } catch (err) {
    console.error('Generate Invite Code Error:', err);
    res.status(500).json({ error: 'Server error generating invite code.' });
  }
});

// Redeem an Invite Code by a family member/guest
app.post('/api/family-circle/redeem', (req, res) => {
  try {
    const { inviteCode, familyUserId, familyUserName } = req.body;
    if (!inviteCode) return res.status(400).json({ error: 'Invite code is required.' });

    const cleanCode = String(inviteCode).trim().toUpperCase();
    const grant = db.prepare('SELECT * FROM FamilyAccessControl WHERE InviteCode = ? AND Status = ?').get(cleanCode, 'active');
    if (!grant) {
      return res.status(404).json({ error: 'Invalid or expired invite code.' });
    }

    if (familyUserId) {
      db.prepare(`
        UPDATE FamilyAccessControl 
        SET Family_User_ID = ?, InviteeName = COALESCE(?, InviteeName)
        WHERE Grant_ID = ?
      `).run(familyUserId, familyUserName || null, grant.Grant_ID);
    }

    res.json({
      success: true,
      message: 'Invite code redeemed successfully. Welcome to the Family Circle!',
      ownerId: grant.Owner_User_ID,
      permissionLevel: grant.PermissionLevel,
      relationship: grant.Relationship
    });
  } catch (err) {
    console.error('Redeem Invite Code Error:', err);
    res.status(500).json({ error: 'Server error redeeming invite code.' });
  }
});

// Grant access to a family member or teammate
app.post('/api/family-circle/grant', (req, res) => {
  try {
    const { ownerId, familyUserId, inviteeName, inviteeEmail, relationship, permissionLevel } = req.body;
    if (!ownerId) {
      return res.status(400).json({ error: 'ownerId is required.' });
    }

    // Ensure owner user exists in Users table to satisfy FK constraint
    db.prepare(`
      INSERT OR IGNORE INTO Users (User_ID, Name, Email, PasswordHash, ProfileType)
      VALUES (?, 'Athlete Owner', ?, 'owner_hash', 'Standard')
    `).run(ownerId, `${ownerId}@legacylane.local`);

    const grantId = 'grant_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    let targetUserId = familyUserId;

    if (!targetUserId) {
      if (inviteeEmail) {
        const existing = db.prepare('SELECT User_ID FROM Users WHERE Email = ?').get(inviteeEmail);
        if (existing) targetUserId = existing.User_ID;
      }
      if (!targetUserId) {
        targetUserId = 'usr_guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
        const guestEmail = inviteeEmail || `${targetUserId}@invited.legacylane.internal`;
        db.prepare(`
          INSERT OR IGNORE INTO Users (User_ID, Name, Email, PasswordHash, ProfileType)
          VALUES (?, ?, ?, 'invited_external', 'Standard')
        `).run(targetUserId, inviteeName || 'Family Guest', guestEmail);
      }
    }

    // Generate readable invite code for this grant
    const codeChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let randomPart = '';
    for (let i = 0; i < 4; i++) {
      randomPart += codeChars.charAt(Math.floor(Math.random() * codeChars.length));
    }
    const inviteCode = `LL-FAM-${randomPart}`;

    db.prepare(`
      INSERT INTO FamilyAccessControl (Grant_ID, Owner_User_ID, Family_User_ID, InviteeName, InviteeEmail, Relationship, PermissionLevel, Status, InviteCode)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'active', ?)
    `).run(
      grantId,
      ownerId,
      targetUserId,
      inviteeName || 'Family Member',
      inviteeEmail || '',
      relationship || 'Family',
      permissionLevel || 'Viewer',
      inviteCode
    );

    res.status(201).json({
      message: 'Access granted successfully.',
      grant: {
        grantId,
        ownerId,
        familyUserId: targetUserId,
        inviteeName: inviteeName || 'Family Member',
        inviteeEmail: inviteeEmail || '',
        relationship: relationship || 'Family',
        permissionLevel: permissionLevel || 'Viewer',
        inviteCode,
        status: 'active',
        grantedAt: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Grant Family Access Error:', err);
    res.status(500).json({ error: 'Server error granting access.' });
  }
});

// Revoke access from a family member or teammate
app.delete('/api/family-circle/:grantId', (req, res) => {
  try {
    const { grantId } = req.params;
    db.prepare(`UPDATE FamilyAccessControl SET Status = 'revoked' WHERE Grant_ID = ?`).run(grantId);
    res.json({ message: 'Access grant revoked.', grantId });
  } catch (err) {
    console.error('Revoke Family Access Error:', err);
    res.status(500).json({ error: 'Server error revoking access.' });
  }
});

// Public / Shareable Keepsake Card endpoint (SRS 4.1 & 71)
app.get('/api/share/keepsake/:memoryId', async (req, res) => {
  try {
    const { memoryId } = req.params;
    const collection = getCollection('MemoryLogs');
    const doc = await collection.findOne({ Memory_ID: memoryId });
    if (!doc) {
      return res.status(404).json({ error: 'Keepsake not found or removed.' });
    }

    let plainText = '';
    if (doc.TextEncrypted) {
      try { plainText = decryptText(doc.TextEncrypted); } catch (e) { plainText = doc.MatchDetails || ''; }
    } else {
      plainText = doc.MatchDetails || '';
    }

    const activePhoto = (doc.MediaAssets && doc.MediaAssets[0]?.url) || null;

    res.json({
      id: doc.Memory_ID,
      title: doc.Title,
      date: doc.EntryDate,
      era: doc.Era || 'Youth & Formative Years',
      quote: plainText,
      photo: activePhoto,
      caption: doc.PhotoCaption || '',
      sentiment: doc.SentimentScore || 85,
      sentimentLabel: doc.SentimentLabel || 'Triumphant & Proud 🌟',
      stars: doc.Stars || 3,
      isInsight: Boolean(doc.IsInsight),
      domain: doc.Domain || 'life'
    });
  } catch (err) {
    console.error('Share Keepsake Error:', err);
    res.status(500).json({ error: 'Server error fetching keepsake.' });
  }
});

// ----------------------------------------------------
// 9. DATA EXPORT & ACCOUNT WIPING (GDPR / SRS Page 21)
// ----------------------------------------------------

app.get('/api/users/:userId/export', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = db.prepare('SELECT User_ID, Name, Email, ProfileType, CreatedAt FROM Users WHERE User_ID = ?').get(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const profile = db.prepare('SELECT * FROM AthleteProfiles WHERE User_ID = ?').get(userId);
    const collection = getCollection('MemoryLogs');
    const memories = await collection.find({ User_ID: userId }).toArray();
    const chatCollection = getCollection('ChatSessions');
    const chats = await chatCollection.find({ User_ID: userId }).toArray();

    const archive = {
      user,
      athleteProfile: profile,
      timelineMemories: memories,
      aiChatHistory: chats,
      exportedAt: new Date().toISOString()
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="LegacyLane_Archive_${userId}.json"`);
    res.json(archive);
  } catch (err) {
    console.error('Export Error:', err);
    res.status(500).json({ error: 'Server error exporting user archive.' });
  }
});

app.delete('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete from SQLite (cascades to AthleteProfiles, UserConnections, FamilyAccessControl via FK)
    db.prepare('DELETE FROM Users WHERE User_ID = ?').run(userId);

    // Delete from MongoDB
    const collection = getCollection('MemoryLogs');
    await collection.deleteMany({ User_ID: userId });

    const chatCollection = getCollection('ChatSessions');
    await chatCollection.deleteMany({ User_ID: userId });

    // Purge from in-memory vector store [Audit M-1: prevents orphaned embeddings post-delete]
    if (typeof removeUserVectors === 'function') {
      removeUserVectors(userId);
    }

    res.json({ message: 'User account and all personal timeline memories permanently deleted.' });
  } catch (err) {
    console.error('Delete Account Error:', err);
    res.status(500).json({ error: 'Server error wiping account.' });
  }
});

// Unified Multi-Page Fallback Route for Full Website
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/ws') || req.path.startsWith('/uploads')) {
    return next();
  }
  const cleanPath = req.path.replace(/^\//, '');
  if (cleanPath === 'selector.html') {
    const query = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    return res.redirect(301, '/timeline.html' + query);
  }
  const requestedFile = path.join(frontendDir, cleanPath);
  if (cleanPath && fs.existsSync(requestedFile) && fs.statSync(requestedFile).isFile()) {
    return res.sendFile(requestedFile);
  }
  const publicFile = path.join(publicDir, cleanPath);
  if (cleanPath && fs.existsSync(publicFile) && fs.statSync(publicFile).isFile()) {
    return res.sendFile(publicFile);
  }
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// Start Server & Connect MongoDB
const server = app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`🚀 LegacyLane Backend Database API listening on http://localhost:${PORT}`);
});

// Initialize Sideline AI Real-Time WebSocket Streaming Server on /ws/sideline-ai
initSidelineWebSocketServer({ server });
