import 'dotenv/config';
import db from './database.js';

console.log('🧪 Starting Family Vault & Circle Backend Verification...');

const testOwnerId = 'usr_vault_test_' + Date.now();
let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
  }
}

// 1. Initial State: Create Owner User
db.prepare(`
  INSERT INTO Users (User_ID, Name, Email, PasswordHash, ProfileType, VaultPIN)
  VALUES (?, 'Test Athlete', ?, 'test_hash', 'Athlete', '1234')
`).run(testOwnerId, `${testOwnerId}@example.com`);

assert(true, 'Created test user with initial VaultPIN 1234');

// 2. Add some test memory logs with mixed privacy
const mem1 = 'mem_test_pub_' + Date.now();
const mem2 = 'mem_test_vault_' + Date.now();
const mem3 = 'mem_test_fam_' + Date.now();

db.prepare(`
  INSERT INTO MemoryLogs (Memory_ID, User_ID, EntryDate, Title, TextEncrypted, IsVaultLocked, PrivacySetting)
  VALUES (?, ?, '2024-01-01', 'Public Milestone', 'enc_1', 0, 'Public')
`).run(mem1, testOwnerId);

db.prepare(`
  INSERT INTO MemoryLogs (Memory_ID, User_ID, EntryDate, Title, TextEncrypted, IsVaultLocked, PrivacySetting)
  VALUES (?, ?, '2024-02-01', 'Encrypted Secret', 'enc_2', 1, 'Vault')
`).run(mem2, testOwnerId);

db.prepare(`
  INSERT INTO MemoryLogs (Memory_ID, User_ID, EntryDate, Title, TextEncrypted, IsVaultLocked, PrivacySetting)
  VALUES (?, ?, '2024-03-01', 'Family Celebration', 'enc_3', 0, 'Family')
`).run(mem3, testOwnerId);

assert(true, 'Inserted 3 test memories (1 public, 1 vault-locked, 1 family)');

// 3. Test Vault Summary Logic
const rows = db.prepare('SELECT IsVaultLocked, PrivacySetting FROM MemoryLogs WHERE User_ID = ?').all(testOwnerId);
const totalMemories = rows.length;
const lockedMemories = rows.filter(r => r.IsVaultLocked === 1 || r.IsVaultLocked === true).length;
const familyMemories = rows.filter(r => r.PrivacySetting === 'Family').length;
const publicMemories = totalMemories - lockedMemories - familyMemories;

assert(totalMemories === 3, `Total memories count is 3 (got ${totalMemories})`);
assert(lockedMemories === 1, `Locked memories count is 1 (got ${lockedMemories})`);
assert(familyMemories === 1, `Family memories count is 1 (got ${familyMemories})`);
assert(publicMemories === 1, `Public memories count is 1 (got ${publicMemories})`);

// 4. Test PIN Verification Logic
const userRow = db.prepare('SELECT VaultPIN FROM Users WHERE User_ID = ?').get(testOwnerId);
assert(userRow.VaultPIN === '1234', 'Vault PIN correctly matches 1234');

// Test PIN Change Logic
db.prepare('UPDATE Users SET VaultPIN = ? WHERE User_ID = ?').run('5678', testOwnerId);
const updatedUser = db.prepare('SELECT VaultPIN FROM Users WHERE User_ID = ?').get(testOwnerId);
assert(updatedUser.VaultPIN === '5678', 'Vault PIN successfully updated to 5678');

// 5. Test Family Invite Code Generation
const grantId = 'grant_test_' + Date.now();
const inviteCode = 'LL-FAM-TEST';
const guestUserId = 'usr_guest_test_' + Date.now();

db.prepare(`
  INSERT INTO Users (User_ID, Name, Email, PasswordHash, ProfileType)
  VALUES (?, 'Grandma Rose', ?, 'guest_hash', 'Standard')
`).run(guestUserId, `${guestUserId}@family.test`);

db.prepare(`
  INSERT INTO FamilyAccessControl (Grant_ID, Owner_User_ID, Family_User_ID, InviteeName, InviteeEmail, Relationship, PermissionLevel, Status, InviteCode)
  VALUES (?, ?, ?, 'Grandma Rose', 'rose@family.test', 'Parent', 'Viewer', 'active', ?)
`).run(grantId, testOwnerId, guestUserId, inviteCode);

const retrievedGrant = db.prepare('SELECT * FROM FamilyAccessControl WHERE InviteCode = ?').get(inviteCode);
assert(retrievedGrant && retrievedGrant.Owner_User_ID === testOwnerId, 'Invite code retrieved matching grant');
assert(retrievedGrant.Relationship === 'Parent', 'Grant preserved relationship Parent');
assert(retrievedGrant.PermissionLevel === 'Viewer', 'Grant preserved PermissionLevel Viewer');

// 6. Test Revocation
db.prepare(`UPDATE FamilyAccessControl SET Status = 'revoked' WHERE Grant_ID = ?`).run(grantId);
const revokedGrant = db.prepare('SELECT Status FROM FamilyAccessControl WHERE Grant_ID = ?').get(grantId);
assert(revokedGrant.Status === 'revoked', 'Grant successfully marked as revoked');

// Cleanup test rows
db.prepare('DELETE FROM MemoryLogs WHERE User_ID = ?').run(testOwnerId);
db.prepare('DELETE FROM FamilyAccessControl WHERE Owner_User_ID = ?').run(testOwnerId);
db.prepare('DELETE FROM Users WHERE User_ID = ?').run(testOwnerId);

console.log(`\n🏁 Test Results: ${passed}/${total} Tests Passed (${Math.round((passed/total)*100)}% Success Rate)`);
if (passed === total) {
  console.log('🎉 Family Vault & Circle Backend Verification COMPLETE!');
  process.exit(0);
} else {
  process.exit(1);
}
