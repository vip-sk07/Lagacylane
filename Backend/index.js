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
  generateYoungerSelfResponse
} from '../AI_Modules/index.js';
import { connectMongoDB, getCollection } from './mongodb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir));

// Storage Engine for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, 'media-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

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
      avatarUrl: avatarUrl || null
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

    const userPayload = {
      id: userRow.User_ID,
      name: userRow.Name,
      email: userRow.Email,
      role: userRow.ProfileType,
      sport: athleteRow ? athleteRow.SportType : 'football',
      position: athleteRow ? athleteRow.Position : 'Player',
      team: athleteRow ? athleteRow.TeamHistory : 'Personal',
      jerseyNumber: athleteRow ? athleteRow.JerseyNumber : 10,
      avatarUrl: userRow.AvatarURL
    };

    res.json({ message: 'Login successful', user: userPayload });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// Google Sign-In Authentication
app.post('/api/auth/google', async (req, res) => {
  try {
    const { email, name, sportType, position, teamHistory, avatarUrl } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Google email and name are required.' });
    }

    let userRow = db.prepare('SELECT * FROM Users WHERE Email = ?').get(email);

    if (!userRow) {
      const userId = 'usr_google_' + Date.now();
      const dummyHash = await bcrypt.hash(userId, 10);

      db.prepare(`
        INSERT INTO Users (User_ID, Name, Email, PasswordHash, ProfileType, AvatarURL)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(userId, name, email, dummyHash, 'Athlete', avatarUrl || null);

      const profileId = 'prof_' + Date.now();
      db.prepare(`
        INSERT INTO AthleteProfiles (Profile_ID, User_ID, SportType, Position, TeamHistory, JerseyNumber)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(profileId, userId, sportType || 'football', position || 'Attacking Midfielder (#10)', teamHistory || 'Legacy Academy', 10);

      userRow = db.prepare('SELECT * FROM Users WHERE User_ID = ?').get(userId);
    }

    const athleteRow = db.prepare('SELECT * FROM AthleteProfiles WHERE User_ID = ?').get(userRow.User_ID);

    const userPayload = {
      id: userRow.User_ID,
      name: userRow.Name,
      email: userRow.Email,
      role: userRow.ProfileType,
      sport: athleteRow ? athleteRow.SportType : (sportType || 'football'),
      position: athleteRow ? athleteRow.Position : 'Player',
      team: athleteRow ? athleteRow.TeamHistory : 'Personal',
      jerseyNumber: athleteRow ? athleteRow.JerseyNumber : 10,
      avatarUrl: userRow.AvatarURL
    };

    res.json({ message: 'Google Sign-In successful', user: userPayload });
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(500).json({ error: 'Server error during Google authentication.' });
  }
});

// ----------------------------------------------------
// 2. ATHLETE PROFILE ENDPOINTS
// ----------------------------------------------------

app.get('/api/profile/:userId', (req, res) => {
  const { userId } = req.params;
  const user = db.prepare('SELECT User_ID, Name, Email, ProfileType, AvatarURL, CreatedAt FROM Users WHERE User_ID = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const profile = db.prepare('SELECT * FROM AthleteProfiles WHERE User_ID = ?').get(userId);
  res.json({ user, profile });
});

app.put('/api/profile/:userId', (req, res) => {
  const { userId } = req.params;
  const { name, sportType, position, teamHistory, jerseyNumber, bio } = req.body;

  if (name) {
    db.prepare('UPDATE Users SET Name = ? WHERE User_ID = ?').run(name, userId);
  }
  if (sportType || position || teamHistory || jerseyNumber || bio) {
    db.prepare(`
      UPDATE AthleteProfiles 
      SET SportType = COALESCE(?, SportType),
          Position = COALESCE(?, Position),
          TeamHistory = COALESCE(?, TeamHistory),
          JerseyNumber = COALESCE(?, JerseyNumber),
          Bio = COALESCE(?, Bio)
      WHERE User_ID = ?
    `).run(sportType, position, teamHistory, jerseyNumber, bio, userId);
  }

  res.json({ message: 'Profile updated successfully' });
});

// ----------------------------------------------------
// 3. IMAGE & MEDIA UPLOAD ENDPOINT
// ----------------------------------------------------

app.post('/api/upload', upload.single('media'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded.' });
  }
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// ----------------------------------------------------
// 4. CHRONOLOGICAL TIMELINE & MEMORY LOGS (MongoDB NoSQL)
// ----------------------------------------------------

app.get('/api/memories/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const collection = getCollection('MemoryLogs');
    const rows = await collection.find({ User_ID: userId }).toArray();

    const memories = rows.map((r, idx) => ({
      id: r.Memory_ID,
      levelNumber: r.LevelNumber || idx + 1,
      title: r.Title,
      era: r.Era || r.Tags?.era || 'Youth Era (2018-2020)',
      date: r.EntryDate,
      stars: r.Stars || 3,
      status: r.Status || (idx === rows.length - 1 ? 'current' : 'completed'),
      matchDetails: r.MatchDetails,
      content: r.TextEncrypted,
      victoryMessage: r.VictoryMessage || '',
      sentiment: r.SentimentScore,
      media: r.MediaAssets ? r.MediaAssets[0]?.url : null,
      tags: r.Tags?.context || []
    }));

    res.json({ memories });
  } catch (err) {
    console.error('Fetch Memories Error:', err);
    res.status(500).json({ error: 'Server error fetching memories.' });
  }
});

// ----------------------------------------------------
// VECTOR EMBEDDING & MEMORY INGESTION PIPELINE
// ----------------------------------------------------

/**
 * 1. Dedicated Production Ingestion Endpoint
 * POST /api/memories/ingest
 * Accepts: { userId, title, description, entryDate, era, emotionTags, contextTags, sentimentScore, mediaUrl }
 */
app.post('/api/memories/ingest', async (req, res) => {
  try {
    const { userId, title, description, entryDate, era, emotionTags, contextTags, sentimentScore, mediaUrl } = req.body;

    if (!title && !description) {
      return res.status(400).json({ error: 'Title or description is required for memory ingestion.' });
    }

    // Attach Commercial Zero-Training Guarantee Header
    res.setHeader('X-Zero-Training-Guarantee', 'Enabled');

    // Run modular ingestion pipeline (Vectorization + AES-256 Encryption + Vector Persistence)
    const result = await ingestMemoryPayload({
      userId,
      title,
      description,
      entryDate,
      era,
      emotionTags,
      contextTags,
      sentimentScore,
      mediaUrl
    });

    // Also persist to MongoDB for timeline display compatibility
    try {
      const collection = getCollection('MemoryLogs');
      await collection.insertOne({
        Memory_ID: result.memoryId,
        User_ID: userId || 'usr_anonymous',
        EntryDate: entryDate || new Date().toISOString().split('T')[0],
        Title: title,
        TextEncrypted: result.metadata.description || description,
        MatchDetails: title,
        Stars: 3,
        SentimentScore: result.metadata.sentimentScore,
        Tags: { era: era || 'Youth Era', context: contextTags || emotionTags || [] },
        MediaAssets: mediaUrl ? [{ url: mediaUrl }] : [],
        CreatedAt: new Date()
      });
    } catch (dbErr) {
      console.warn('MongoDB duplicate/sync warning during ingest:', dbErr.message);
    }

    res.status(201).json(result);
  } catch (err) {
    console.error('Ingestion Pipeline Error:', err);
    res.status(500).json({ error: 'Failed to ingest memory and update vector index.' });
  }
});

/**
 * 2. Semantic Similarity Vector Search Endpoint
 * GET /api/memories/vector-search?query=...&userId=...
 */
app.get('/api/memories/vector-search', async (req, res) => {
  try {
    const { query, userId, topK } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query string is required for semantic vector search.' });
    }

    const matches = await searchMemoriesByQuery(query, userId, parseInt(topK) || 5);
    res.json({ status: 'success', query, count: matches.length, matches });
  } catch (err) {
    console.error('Vector Search Error:', err);
    res.status(500).json({ error: 'Failed to execute vector search.' });
  }
});

/**
 * 3. Phase 2 Era-Filtered Hybrid RAG Context Retrieval Endpoint
 * POST /api/memories/retrieve-context
 * Accepts: { userId, selectedEra, userPrompt, topK }
 */
app.post('/api/memories/retrieve-context', async (req, res) => {
  try {
    const { userId, selectedEra, userPrompt, topK } = req.body;

    if (!userId || !selectedEra) {
      return res.status(400).json({ error: 'userId and selectedEra are required parameters.' });
    }

    const ragResult = await retrieveEraContext({
      userId,
      selectedEra,
      userPrompt,
      topK: Number(topK) || 4
    });

    res.json(ragResult);
  } catch (err) {
    console.error('RAG Context Retrieval Error:', err);
    res.status(500).json({ error: 'Failed to retrieve era-constrained context.' });
  }
});

/**
 * 4. Supabase Schema DDL Endpoint
 * GET /api/memories/supabase-schema
 */
app.get('/api/memories/supabase-schema', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(getSupabaseSchemaSQL());
});

// Add New Memory Log / Level Node with dynamic sentiment analysis & vector ingestion
app.post('/api/memories', async (req, res) => {
  try {
    const { userId, title, era, date, matchDetails, content, victoryMessage, stars, mediaUrl, tags } = req.body;

    const memoryId = 'mem_' + Date.now();
    
    // Analyze sentiment dynamically using the AI module
    const sentimentScore = analyzeSentiment(title, content + ' ' + (victoryMessage || ''));

    // Ingest into Vector Store asynchronously
    ingestMemoryPayload({
      userId,
      title,
      description: content,
      entryDate: date,
      era,
      emotionTags: tags,
      contextTags: tags,
      sentimentScore,
      mediaUrl
    }).catch(err => console.error('Background Vector Ingest Warning:', err.message));

    const doc = {
      Memory_ID: memoryId,
      User_ID: userId,
      EntryDate: date || new Date().toISOString().split('T')[0],
      Title: title,
      Era: era || 'Youth Era (2018-2020)',
      MatchDetails: matchDetails || title,
      TextEncrypted: content,
      VictoryMessage: victoryMessage || '',
      Stars: Number(stars) || 3,
      Status: 'completed',
      SentimentScore: sentimentScore,
      Tags: { era: era || 'Youth Era (2018-2020)', context: tags || [] },
      MediaAssets: mediaUrl ? [{ url: mediaUrl, type: 'image' }] : [],
      CreatedAt: new Date()
    };

    const collection = getCollection('MemoryLogs');
    await collection.insertOne(doc);

    res.status(201).json({ message: 'Level node added to database & vector index updated', memoryId, sentimentScore });
  } catch (err) {
    console.error('Add Memory Error:', err);
    res.status(500).json({ error: 'Server error saving memory node.' });
  }
});

// ----------------------------------------------------
// 5. AI YOUNGER SELF CHAT ENDPOINT
// ----------------------------------------------------

app.post('/api/chat', async (req, res) => {
  try {
    const { userId, era, userMessage, history, retrievedContext } = req.body;

    const messageText = userMessage || (history && history.length > 0 ? history[history.length - 1].content : '');

    if (!messageText) {
      return res.status(400).json({ error: 'userMessage or history content is required.' });
    }
    
    // Delegate to Phase 3 Persona Orchestration Engine
    const orchestrationResult = await generateYoungerSelfResponse({
      history: history || [],
      newPrompt: messageText,
      retrievedContext: retrievedContext || null,
      selectedEra: era || 'Youth Era',
      userId: userId || 'usr_default'
    });

    // Save Chat Session History in MongoDB
    try {
      const chatCollection = getCollection('ChatSessions');
      await chatCollection.insertOne({
        User_ID: userId || 'usr_default',
        EraSelected: era || 'Youth Era',
        StartTime: new Date(),
        Messages: [
          { sender: 'user', text: messageText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
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
      era: orchestrationResult.selectedEra,
      eraAge: orchestrationResult.eraAge,
      model: orchestrationResult.model
    });
  } catch (err) {
    console.error('AI Chat Error:', err);
    res.status(500).json({ error: 'Server error generating persona response.' });
  }
});

// ----------------------------------------------------
// 6. WELLNESS & SENTIMENT ANALYTICS ENDPOINT
// ----------------------------------------------------

app.get('/api/analytics/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const collection = getCollection('MemoryLogs');
    const rows = await collection.find({ User_ID: userId }).toArray();

    const dataPoints = rows.map(r => ({
      date: r.EntryDate ? r.EntryDate.substring(0, 7) : '2024-01',
      score: r.SentimentScore || 0.8,
      title: r.Title
    }));

    const avgSentiment = dataPoints.length > 0
      ? dataPoints.reduce((acc, p) => acc + p.score, 0) / dataPoints.length
      : 0.85;

    res.json({
      dataPoints,
      burnoutRisk: avgSentiment > 0.6 ? 'Low' : avgSentiment > 0.2 ? 'Moderate' : 'High',
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
  const { followerId, followingId } = req.body;
  const connectionId = 'conn_' + Date.now();
  db.prepare(`
    INSERT INTO UserConnections (Connection_ID, Follower_ID, Following_ID, Status)
    VALUES (?, ?, ?, 'pending')
  `).run(connectionId, followerId, followingId);

  res.status(201).json({ message: 'Follow request sent', connectionId });
});

// Start Server & Connect MongoDB
app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`🚀 LegacyLane Backend Database API listening on http://localhost:${PORT}`);
});
