import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'legacylane.db');
const db = new Database(dbPath);

// Enable Foreign Keys
db.pragma('foreign_keys = ON');

// Initialize Schema based on LegacyLane_Database_Dictionary.pdf
db.exec(`
  -- Structured Data Table: Users
  CREATE TABLE IF NOT EXISTS Users (
    User_ID TEXT PRIMARY KEY,
    Name TEXT NOT NULL,
    Email TEXT UNIQUE NOT NULL,
    PasswordHash TEXT NOT NULL,
    ProfileType TEXT NOT NULL CHECK(ProfileType IN ('Standard', 'Athlete')),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Structured Data Table: AthleteProfiles
  CREATE TABLE IF NOT EXISTS AthleteProfiles (
    Profile_ID TEXT PRIMARY KEY,
    User_ID TEXT NOT NULL,
    SportType TEXT NOT NULL,
    Position TEXT NOT NULL,
    TeamHistory TEXT,
    FOREIGN KEY(User_ID) REFERENCES Users(User_ID) ON DELETE CASCADE
  );

  -- Structured Data Table: FamilyAccessControl & UserConnections
  CREATE TABLE IF NOT EXISTS FamilyAccessControl (
    Grant_ID TEXT PRIMARY KEY,
    Owner_User_ID TEXT NOT NULL,
    Family_User_ID TEXT NOT NULL,
    PermissionLevel TEXT DEFAULT 'ViewOnly',
    Status TEXT DEFAULT 'PENDING' CHECK(Status IN ('PENDING', 'ACCEPTED', 'REJECTED')),
    GrantedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(Owner_User_ID) REFERENCES Users(User_ID) ON DELETE CASCADE,
    FOREIGN KEY(Family_User_ID) REFERENCES Users(User_ID) ON DELETE CASCADE
  );

  -- Unstructured Document Collection: MemoryLogs
  CREATE TABLE IF NOT EXISTS MemoryLogs (
    Memory_ID TEXT PRIMARY KEY,
    User_ID TEXT NOT NULL,
    EntryDate TEXT NOT NULL,
    Title TEXT NOT NULL,
    TextEncrypted TEXT NOT NULL,
    MatchDetails TEXT,
    Stars INTEGER DEFAULT 3,
    SentimentScore REAL DEFAULT 0.85,
    PrivacySetting TEXT DEFAULT 'Public',
    TagsJSON TEXT,
    MediaAssetsJSON TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(User_ID) REFERENCES Users(User_ID) ON DELETE CASCADE
  );

  -- Unstructured Document Collection: ChatSessions
  CREATE TABLE IF NOT EXISTS ChatSessions (
    Session_ID TEXT PRIMARY KEY,
    User_ID TEXT NOT NULL,
    EraSelected TEXT NOT NULL,
    StartTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    MessagesJSON TEXT,
    FOREIGN KEY(User_ID) REFERENCES Users(User_ID) ON DELETE CASCADE
  );
`);

console.log('✅ LegacyLane SQLite Database Initialized Successfully at', dbPath);

export default db;
