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
  initSidelineWebSocketServer
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

// Semantic Search & Tag Filtering Endpoint (SRS Page 16 - REQ-3)
app.get('/api/memories/search/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { q, era, tag } = req.query;

    const collection = getCollection('MemoryLogs');
    const rows = await collection.find({ User_ID: userId }).toArray();

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
        r.TextEncrypted?.toLowerCase().includes(query) ||
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

// ----------------------------------------------------
// 8. FAMILY ACCESS CONTROL & VAULT PERMISSION ENDPOINTS
// ----------------------------------------------------

app.get('/api/vault/:ownerId', async (req, res) => {
  try {
    const { ownerId } = req.params;
    const { viewerId } = req.query;

    if (ownerId !== viewerId) {
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

app.post('/api/vault/grant', (req, res) => {
  const { ownerId, familyUserId, permissionLevel } = req.body;
  const grantId = 'grant_' + Date.now();

  db.prepare(`
    INSERT INTO FamilyAccessControl (Grant_ID, Owner_User_ID, Family_User_ID, PermissionLevel, Status)
    VALUES (?, ?, ?, ?, 'active')
  `).run(grantId, ownerId, familyUserId, permissionLevel || 'Viewer');

  res.status(201).json({ message: 'Vault access granted', grantId });
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

    // Delete from SQLite
    db.prepare('DELETE FROM Users WHERE User_ID = ?').run(userId);

    // Delete from MongoDB
    const collection = getCollection('MemoryLogs');
    await collection.deleteMany({ User_ID: userId });

    const chatCollection = getCollection('ChatSessions');
    await chatCollection.deleteMany({ User_ID: userId });

    res.json({ message: 'User account and all personal timeline memories permanently deleted.' });
  } catch (err) {
    console.error('Delete Account Error:', err);
    res.status(500).json({ error: 'Server error wiping account.' });
  }
});

// Start Server & Connect MongoDB
const server = app.listen(PORT, async () => {
  await connectMongoDB();
  console.log(`🚀 LegacyLane Backend Database API listening on http://localhost:${PORT}`);
});

// Initialize Sideline AI Real-Time WebSocket Streaming Server on /ws/sideline-ai
initSidelineWebSocketServer({ server });
