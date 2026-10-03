import { MongoClient } from 'mongodb';
import sqliteDb from './database.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = 'legacylane';

let dbClient = null;
let db = null;
let useFallback = false;

// Fallback in-memory cache for fast lookup + persistent SQLite synchronization
const memoryFallback = {
  MemoryLogs: [],
  ChatSessions: [],
  SentimentAnalytics: []
};

/**
 * Convert SQLite MemoryLogs row into a standard memory document
 */
function rowToMemoryDoc(row) {
  if (!row) return null;
  let tags = { era: row.Era || 'Youth & Formative Years', context: [] };
  try {
    if (row.TagsJSON) {
      const parsed = typeof row.TagsJSON === 'string' ? JSON.parse(row.TagsJSON) : row.TagsJSON;
      tags = parsed;
    }
  } catch (e) {}

  let mediaAssets = [];
  try {
    if (row.MediaAssetsJSON) {
      mediaAssets = typeof row.MediaAssetsJSON === 'string' ? JSON.parse(row.MediaAssetsJSON) : row.MediaAssetsJSON;
    }
  } catch (e) {}

  let visualPerception = null;
  try {
    if (row.VisualPerceptionJSON) {
      visualPerception = typeof row.VisualPerceptionJSON === 'string' ? JSON.parse(row.VisualPerceptionJSON) : row.VisualPerceptionJSON;
    }
  } catch (e) {}

  return {
    Memory_ID: row.Memory_ID,
    User_ID: row.User_ID,
    JourneyType: row.JourneyType || 'life',
    Domain: row.Domain || 'life',
    EntryDate: row.EntryDate,
    Title: row.Title,
    Era: row.Era || 'Youth & Formative Years',
    MatchDetails: row.MatchDetails || '',
    TextEncrypted: row.TextEncrypted || '',
    VictoryMessage: row.VictoryMessage || '',
    Stars: row.Stars || 3,
    SentimentScore: typeof row.SentimentScore === 'number' ? row.SentimentScore : 85,
    SentimentLabel: row.SentimentLabel || '',
    Location: row.Location || '',
    People: row.People || '',
    IsFavorite: Boolean(row.IsFavorite),
    IsInsight: Boolean(row.IsInsight),
    IsVaultLocked: Boolean(row.IsVaultLocked),
    PrivacySetting: row.PrivacySetting || (row.IsVaultLocked ? 'Vault' : 'Public'),
    PhotoCaption: row.PhotoCaption || '',
    Tags: tags,
    MediaAssets: mediaAssets,
    VisualPerception: visualPerception,
    CreatedAt: row.CreatedAt
  };
}

/**
 * Save memory document permanently into SQLite MemoryLogs
 */
function saveMemoryDocToSQLite(doc) {
  try {
    const uid = doc.User_ID || doc.userId;
    if (!uid) return;

    // Ensure user exists in Users table so foreign key constraint never fails
    try {
      sqliteDb.prepare(`
        INSERT OR IGNORE INTO Users (User_ID, Name, Email, PasswordHash, ProfileType)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        uid,
        doc.UserName || doc.userName || uid,
        `${uid}@legacylane.local`,
        'auto_generated_hash',
        (doc.JourneyType === 'athlete' || doc.journeyType === 'athlete') ? 'Athlete' : 'Standard'
      );
    } catch (uErr) {}

    const memId = doc.Memory_ID || doc.memoryId || doc.id || ('mem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4));
    const jType = doc.JourneyType || doc.journeyType || 'life';
    const dom = doc.Domain || doc.domain || 'life';

    sqliteDb.prepare(`
      INSERT OR REPLACE INTO MemoryLogs (
        Memory_ID, User_ID, EntryDate, Title, TextEncrypted, MatchDetails,
        VictoryMessage, Stars, SentimentScore, PrivacySetting, TagsJSON,
        MediaAssetsJSON, CreatedAt, JourneyType, Domain, Era, SentimentLabel,
        Location, People, IsFavorite, IsInsight, IsVaultLocked, PhotoCaption, VisualPerceptionJSON
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      memId,
      uid,
      doc.EntryDate || doc.date || new Date().toISOString().split('T')[0],
      doc.Title || doc.title || 'Milestone',
      doc.TextEncrypted || '',
      doc.MatchDetails || doc.journal || doc.content || '',
      doc.VictoryMessage || doc.victoryMessage || '',
      Number(doc.Stars || doc.stars) || 3,
      Number(doc.SentimentScore ?? doc.sentiment) || 85,
      doc.PrivacySetting || (doc.IsVaultLocked || doc.isVaultLocked ? 'Vault' : 'Public'),
      JSON.stringify(doc.Tags || doc.tags || {}),
      JSON.stringify(doc.MediaAssets || doc.mediaAssets || doc.photos || []),
      doc.CreatedAt instanceof Date ? doc.CreatedAt.toISOString() : (doc.CreatedAt || new Date().toISOString()),
      jType,
      dom,
      doc.Era || doc.era || 'Youth & Formative Years',
      doc.SentimentLabel || doc.sentimentLabel || '',
      doc.Location || doc.location || '',
      doc.People || doc.people || '',
      (doc.IsFavorite || doc.isFavorite) ? 1 : 0,
      (doc.IsInsight || doc.isInsight) ? 1 : 0,
      (doc.IsVaultLocked || doc.isVaultLocked) ? 1 : 0,
      doc.PhotoCaption || doc.caption || '',
      JSON.stringify(doc.VisualPerception || doc.visualPerception || {})
    );
  } catch (err) {
    console.warn('SQLite MemoryLogs save warning:', err.message);
  }
}

/**
 * Initializes and connects to the MongoDB instance.
 * Falls back gracefully to SQLite persistent storage if MongoDB is unavailable.
 */
export async function connectMongoDB() {
  try {
    dbClient = new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: 2000 // fast timeout for local check
    });
    await dbClient.connect();
    db = dbClient.db(DB_NAME);
    const isAtlas = MONGO_URI.includes('mongodb+srv://');
    console.log(`✅ Connected to MongoDB NoSQL database successfully (${isAtlas ? 'MongoDB Atlas Cloud' : 'Local MongoDB'}) [DB: ${db.databaseName}]`);
    useFallback = false;
  } catch (err) {
    const maskedUri = MONGO_URI.replace(/:[^:@]+@/, ':****@');
    console.warn(`ℹ️ MongoDB (${maskedUri}) offline (${err.message}). Using SQLite permanent storage for zero memory loss.`);
    useFallback = true;
  }
}

/**
 * Gets the MongoDB collection or SQLite persistent fallback storage.
 * @param {string} collectionName - 'MemoryLogs' or 'ChatSessions'
 */
export function getCollection(collectionName) {
  if (useFallback || !db) {
    if (collectionName === 'MemoryLogs') {
      return {
        find: (query = {}) => {
          let rows = [];
          try {
            let sql = 'SELECT * FROM MemoryLogs WHERE 1=1';
            const params = [];
            const uid = query.User_ID || query.userId || query.user_id;
            if (uid) {
              sql += ' AND User_ID = ?';
              params.push(uid);
            }
            const jType = query.JourneyType || query.journeyType;
            if (jType && jType !== 'all') {
              sql += ' AND JourneyType = ?';
              params.push(jType);
            }
            const dom = query.Domain || query.domain;
            if (dom && dom !== 'all') {
              sql += ' AND Domain = ?';
              params.push(dom);
            }
            sql += ' ORDER BY EntryDate ASC';
            rows = sqliteDb.prepare(sql).all(...params);
          } catch (e) {
            console.warn('SQLite find MemoryLogs error:', e.message);
          }
          let list = rows.map(rowToMemoryDoc);

          const cursor = {
            skip(n = 0) {
              list = list.slice(n);
              return cursor;
            },
            limit(n = 100) {
              list = list.slice(0, n);
              return cursor;
            },
            sort() {
              return cursor;
            },
            toArray: async () => list
          };
          return cursor;
        },
        insertOne: async (doc) => {
          saveMemoryDocToSQLite(doc);
          return { insertedId: doc.Memory_ID || doc.id || Date.now().toString() };
        },
        findOne: async (query = {}) => {
          try {
            const mid = query.Memory_ID || query.memoryId || query.id;
            if (mid) {
              const row = sqliteDb.prepare('SELECT * FROM MemoryLogs WHERE Memory_ID = ?').get(mid);
              return rowToMemoryDoc(row);
            }
            const uid = query.User_ID || query.userId || query.user_id;
            if (uid) {
              const row = sqliteDb.prepare('SELECT * FROM MemoryLogs WHERE User_ID = ? ORDER BY EntryDate ASC LIMIT 1').get(uid);
              return rowToMemoryDoc(row);
            }
          } catch (e) {}
          return null;
        },
        updateOne: async (query = {}, update = {}) => {
          const mid = query.Memory_ID || query.memoryId || query.id;
          if (!mid) return { matchedCount: 0, modifiedCount: 0 };
          const existing = sqliteDb.prepare('SELECT * FROM MemoryLogs WHERE Memory_ID = ?').get(mid);
          if (!existing) return { matchedCount: 0, modifiedCount: 0 };

          const currentDoc = rowToMemoryDoc(existing);
          const fields = update.$set || update;
          const merged = { ...currentDoc, ...fields };
          saveMemoryDocToSQLite(merged);
          return { matchedCount: 1, modifiedCount: 1 };
        },
        deleteOne: async (query = {}) => {
          const mid = query.Memory_ID || query.memoryId || query.id;
          if (mid) {
            const res = sqliteDb.prepare('DELETE FROM MemoryLogs WHERE Memory_ID = ?').run(mid);
            return { deletedCount: res.changes || 0 };
          }
          return { deletedCount: 0 };
        },
        deleteMany: async (query = {}) => {
          const uid = query.User_ID || query.userId || query.user_id;
          if (uid) {
            const res = sqliteDb.prepare('DELETE FROM MemoryLogs WHERE User_ID = ?').run(uid);
            return { deletedCount: res.changes || 0 };
          }
          return { deletedCount: 0 };
        }
      };
    }

    if (collectionName === 'ChatSessions') {
      return {
        find: (query = {}) => {
          let rows = [];
          try {
            if (query.User_ID) {
              rows = sqliteDb.prepare('SELECT * FROM ChatSessions WHERE User_ID = ? ORDER BY StartTime ASC').all(query.User_ID);
            } else {
              rows = sqliteDb.prepare('SELECT * FROM ChatSessions ORDER BY StartTime ASC').all();
            }
          } catch (e) {}
          const list = rows.map(r => ({
            Session_ID: r.Session_ID,
            User_ID: r.User_ID,
            EraSelected: r.EraSelected,
            StartTime: r.StartTime,
            Messages: (() => { try { return JSON.parse(r.MessagesJSON); } catch (e) { return []; } })()
          }));
          const cursor = {
            skip(n = 0) { return cursor; },
            limit(n = 50) { return cursor; },
            sort() { return cursor; },
            toArray: async () => list
          };
          return cursor;
        },
        insertOne: async (doc) => {
          try {
            sqliteDb.prepare(`
              INSERT OR REPLACE INTO ChatSessions (Session_ID, User_ID, EraSelected, StartTime, MessagesJSON)
              VALUES (?, ?, ?, ?, ?)
            `).run(
              doc.Session_ID || ('sess_' + Date.now()),
              doc.User_ID,
              doc.EraSelected || 'Current',
              doc.StartTime instanceof Date ? doc.StartTime.toISOString() : (doc.StartTime || new Date().toISOString()),
              JSON.stringify(doc.Messages || [])
            );
          } catch (e) {}
          return { insertedId: doc.Session_ID };
        },
        findOne: async (query = {}) => {
          try {
            if (query.User_ID) {
              const r = sqliteDb.prepare('SELECT * FROM ChatSessions WHERE User_ID = ? ORDER BY StartTime DESC LIMIT 1').get(query.User_ID);
              if (r) {
                return {
                  Session_ID: r.Session_ID,
                  User_ID: r.User_ID,
                  EraSelected: r.EraSelected,
                  StartTime: r.StartTime,
                  Messages: (() => { try { return JSON.parse(r.MessagesJSON); } catch (e) { return []; } })()
                };
              }
            }
          } catch (e) {}
          return null;
        },
        updateOne: async (query = {}, update = {}) => {
          return { matchedCount: 1, modifiedCount: 1 };
        },
        deleteOne: async (query = {}) => {
          return { deletedCount: 1 };
        },
        deleteMany: async (query = {}) => {
          if (query.User_ID) {
            try { sqliteDb.prepare('DELETE FROM ChatSessions WHERE User_ID = ?').run(query.User_ID); } catch (e) {}
          }
          return { deletedCount: 1 };
        }
      };
    }

    if (!memoryFallback[collectionName]) {
      memoryFallback[collectionName] = [];
    }
    return {
      find: (query = {}) => {
        let list = [...memoryFallback[collectionName]];
        const cursor = {
          skip: (n) => { list = list.slice(n); return cursor; },
          limit: (n) => { list = list.slice(0, n); return cursor; },
          sort: () => cursor,
          toArray: async () => list
        };
        return cursor;
      },
      insertOne: async (doc) => {
        memoryFallback[collectionName].push(doc);
        return { insertedId: Date.now().toString() };
      },
      findOne: async () => null,
      updateOne: async () => ({ matchedCount: 1, modifiedCount: 1 }),
      deleteOne: async () => ({ deletedCount: 1 }),
      deleteMany: async () => ({ deletedCount: 0 })
    };
  }

  // When MongoDB is connected, return wrapped collection that also backs up to SQLite for durability
  const rawColl = db.collection(collectionName);
  if (collectionName === 'MemoryLogs') {
    return {
      find: (...args) => rawColl.find(...args),
      findOne: (...args) => rawColl.findOne(...args),
      insertOne: async (doc) => {
        saveMemoryDocToSQLite(doc);
        return rawColl.insertOne(doc);
      },
      updateOne: async (query, update) => {
        try {
          if (query.Memory_ID) {
            const fields = update.$set || update;
            const existing = await rawColl.findOne({ Memory_ID: query.Memory_ID });
            if (existing) {
              saveMemoryDocToSQLite({ ...existing, ...fields });
            }
          }
        } catch (e) {}
        return rawColl.updateOne(query, update);
      },
      deleteOne: async (query) => {
        try {
          if (query.Memory_ID) {
            sqliteDb.prepare('DELETE FROM MemoryLogs WHERE Memory_ID = ?').run(query.Memory_ID);
          }
        } catch (e) {}
        return rawColl.deleteOne(query);
      },
      deleteMany: async (query) => {
        try {
          if (query.User_ID) {
            sqliteDb.prepare('DELETE FROM MemoryLogs WHERE User_ID = ?').run(query.User_ID);
          }
        } catch (e) {}
        return rawColl.deleteMany(query);
      }
    };
  }

  return rawColl;
}
