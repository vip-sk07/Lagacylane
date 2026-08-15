import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = 'legacylane';

let dbClient = null;
let db = null;
let useFallback = false;

// Fallback in-memory/file storage if MongoDB is not yet running/reachable
const memoryFallback = {
  MemoryLogs: [],
  ChatSessions: []
};

/**
 * Initializes and connects to the MongoDB instance.
 * Falls back gracefully to memory storage if MongoDB is unavailable.
 */
export async function connectMongoDB() {
  try {
    dbClient = new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: 3000 // 3 seconds timeout
    });
    await dbClient.connect();
    db = dbClient.db(DB_NAME);
    console.log('✅ Connected to MongoDB NoSQL database successfully on port 27017!');
    useFallback = false;
  } catch (err) {
    console.warn('⚠️ MongoDB is starting or unreachable. Falling back to structured memory logs storage.');
    useFallback = true;
  }
}

/**
 * Gets the MongoDB collection or fallback storage.
 * @param {string} collectionName - 'MemoryLogs' or 'ChatSessions'
 */
export function getCollection(collectionName) {
  if (useFallback || !db) {
    return {
      find: (query = {}) => {
        let results = memoryFallback[collectionName];
        if (query.User_ID) {
          results = results.filter(item => item.User_ID === query.User_ID);
        }
        return {
          toArray: async () => results,
          sort: () => ({ toArray: async () => results })
        };
      },
      insertOne: async (doc) => {
        memoryFallback[collectionName].push(doc);
        return { insertedId: doc._id || Date.now().toString() };
      }
    };
  }
  return db.collection(collectionName);
}
