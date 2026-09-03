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
  getSupabaseSchemaSQL 
} from '../AI_Modules/index.js';
import { connectMongoDB, getCollection } from './mongodb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

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
// AUTHENTICATION & USER REGISTRATION ENDPOINTS
// ----------------------------------------------------

// 1. Register New User / Create Account
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, profileType, sportType, position, teamHistory } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existing = db.prepare('SELECT User_ID FROM Users WHERE Email = ?').get(email);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    const passwordHash = await bcrypt.hash(password, 10);
    const isAthlete = profileType === 'Athlete';

    db.prepare(`
      INSERT INTO Users (User_ID, Name, Email, PasswordHash, ProfileType)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, name, email, passwordHash, isAthlete ? 'Athlete' : 'Standard');

    const profileId = 'prof_' + Date.now();
    db.prepare(`
      INSERT INTO AthleteProfiles (Profile_ID, User_ID, SportType, Position, TeamHistory)
      VALUES (?, ?, ?, ?, ?)
    `).run(profileId, userId, sportType || 'Football', position || 'Attacking Midfielder', teamHistory || 'Academy XI');

    const newUser = {
      id: userId,
      name,
      email,
      role: isAthlete ? 'Athlete' : 'Standard',
      sport: sportType || 'Football',
      position: position || 'Player',
      team: teamHistory || 'Personal Timeline'
    };

    res.status(201).json({ message: 'Account created successfully', user: newUser });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ error: 'Server error creating account.' });
  }
});

// 2. Login User
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
      sport: athleteRow ? athleteRow.SportType : 'Football',
      position: athleteRow ? athleteRow.Position : 'Player',
      team: athleteRow ? athleteRow.TeamHistory : 'Personal'
    };

    res.json({ message: 'Login successful', user: userPayload });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// 3. Google Sign-In Authentication
app.post('/api/auth/google', async (req, res) => {
  try {
    const { email, name, sportType, position, teamHistory } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Google email and name are required.' });
    }

    let userRow = db.prepare('SELECT * FROM Users WHERE Email = ?').get(email);

    if (!userRow) {
      // Auto-register Google user
      const userId = 'usr_google_' + Date.now();
      const dummyHash = await bcrypt.hash(userId, 10);

      db.prepare(`
        INSERT INTO Users (User_ID, Name, Email, PasswordHash, ProfileType)
        VALUES (?, ?, ?, ?, ?)
      `).run(userId, name, email, dummyHash, 'Athlete');

      const profileId = 'prof_' + Date.now();
      db.prepare(`
        INSERT INTO AthleteProfiles (Profile_ID, User_ID, SportType, Position, TeamHistory)
        VALUES (?, ?, ?, ?, ?)
      `).run(profileId, userId, sportType || 'Football', position || 'Attacking Midfielder (#10)', teamHistory || 'Legacy Academy');

      userRow = db.prepare('SELECT * FROM Users WHERE User_ID = ?').get(userId);
    }

    const athleteRow = db.prepare('SELECT * FROM AthleteProfiles WHERE User_ID = ?').get(userRow.User_ID);

    const userPayload = {
      id: userRow.User_ID,
      name: userRow.Name,
      email: userRow.Email,
      role: userRow.ProfileType,
      sport: athleteRow ? athleteRow.SportType : (sportType || 'Football'),
      position: athleteRow ? athleteRow.Position : 'Player',
      team: athleteRow ? athleteRow.TeamHistory : 'Personal'
    };

    res.json({ message: 'Google Sign-In successful', user: userPayload });
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(500).json({ error: 'Server error during Google authentication.' });
  }
});

// ----------------------------------------------------
// IMAGE UPLOAD ENDPOINT
// ----------------------------------------------------
app.post('/api/upload', upload.single('media'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded.' });
  }
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// ----------------------------------------------------
// MEMORY LOGS & LEVEL NODES ENDPOINTS (MongoDB NoSQL)
// ----------------------------------------------------

app.get('/api/memories/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const collection = getCollection('MemoryLogs');
    const rows = await collection.find({ User_ID: userId }).toArray();

    const memories = rows.map((r, idx) => ({
      id: r.Memory_ID,
      levelNumber: idx + 1,
      title: r.Title,
      era: r.Tags ? r.Tags.era || 'Youth Era' : 'Youth Era',
      date: r.EntryDate,
      stars: r.Stars || 3,
      status: idx === rows.length - 1 ? 'current' : 'completed',
      matchDetails: r.MatchDetails,
      content: r.TextEncrypted,
      sentiment: r.SentimentScore,
      media: r.MediaAssets ? r.MediaAssets[0]?.url : null,
      tags: r.Tags ? r.Tags.context || [] : []
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
 * 3. Supabase Schema DDL Endpoint
 * GET /api/memories/supabase-schema
 */
app.get('/api/memories/supabase-schema', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(getSupabaseSchemaSQL());
});

// Add New Memory Log / Level Node with dynamic sentiment analysis & vector ingestion
app.post('/api/memories', async (req, res) => {
  try {
    const { userId, title, era, date, matchDetails, content, stars, mediaUrl, tags } = req.body;

    const memoryId = 'mem_' + Date.now();
    
    // Analyze sentiment dynamically using the AI module
    const sentimentScore = analyzeSentiment(title, content);

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
      EntryDate: date,
      Title: title,
      TextEncrypted: content,
      MatchDetails: matchDetails || title,
      Stars: stars || 3,
      SentimentScore: sentimentScore,
      Tags: { era: era || 'Youth Era', context: tags || [] },
      MediaAssets: mediaUrl ? [{ url: mediaUrl }] : [],
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

// Chat with AI Younger Self persona grounded on memories
app.post('/api/chat', async (req, res) => {
  try {
    const { userId, era, userMessage } = req.body;
    
    // Get user memories matching this era from MongoDB database
    const collection = getCollection('MemoryLogs');
    const rows = await collection.find({ User_ID: userId }).toArray();
    const eraMemories = rows
      .filter((r) => r.Tags?.era === era)
      .map((r) => ({
        title: r.Title,
        content: r.TextEncrypted
      }));

    // Delegate generation to the AI modules persona engine
    const responseText = await generatePersonaResponse(era, eraMemories, userMessage);

    // Save Chat Session History
    const chatCollection = getCollection('ChatSessions');
    await chatCollection.insertOne({
      User_ID: userId,
      EraSelected: era,
      StartTime: new Date(),
      Messages: [{ text: userMessage, sender: 'user' }, { text: responseText, sender: 'ai' }]
    });

    res.json({ response: responseText });
  } catch (err) {
    console.error('AI Chat Error:', err);
    res.status(500).json({ error: 'Server error generating persona response.' });
  }
});

app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`🚀 LegacyLane Backend Database API listening on http://localhost:${PORT}`);
});
