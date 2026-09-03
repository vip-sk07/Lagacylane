/**
 * LegacyLane Backend Automated Test Suite
 * Tests all REST API endpoints, SQLite tables, MongoDB collections, and AI ingestion.
 */

async function runTests() {
  console.log('🧪 Starting LegacyLane Backend Test Suite...\n');
  const baseUrl = 'http://localhost:5000';
  let passed = 0;
  let total = 0;

  async function test(name, fn) {
    total++;
    try {
      await fn();
      console.log(`  ✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ [FAIL] ${name}:`, err.message);
    }
  }

  const testEmail = `test_athlete_${Date.now()}@legacylane.internal`;
  let testUserId = null;

  // 1. Test Registration
  await test('POST /api/auth/register (Create Athlete Account)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Karan Test Athlete',
        email: testEmail,
        password: 'securePassword123',
        profileType: 'Athlete',
        sportType: 'football',
        position: 'Attacking Midfielder (#10)',
        teamHistory: 'Academy XI'
      })
    });
    const data = await res.json();
    if (!res.ok || !data.user?.id) throw new Error(data.error || 'Registration failed');
    testUserId = data.user.id;
  });

  // 2. Test Login
  await test('POST /api/auth/login (Verify Hashed Credentials)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'securePassword123'
      })
    });
    const data = await res.json();
    if (!res.ok || data.user?.email !== testEmail) throw new Error(data.error || 'Login failed');
  });

  // 3. Test Profile Retrieval
  await test('GET /api/profile/:userId (Fetch SQLite Profile)', async () => {
    const res = await fetch(`${baseUrl}/api/profile/${testUserId}`);
    const data = await res.json();
    if (!res.ok || !data.profile?.SportType) throw new Error('Profile fetch failed');
  });

  // 4. Test Memory / Level Node Creation (MongoDB NoSQL)
  let testMemoryId = null;
  await test('POST /api/memories (Add Milestone & Ingest AI Sentiment)', async () => {
    const res = await fetch(`${baseUrl}/api/memories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: testUserId,
        title: 'Championship Cup Final Victory',
        era: 'Youth Era (2018-2020)',
        date: '2020-04-12',
        matchDetails: '2 Goals, 1 Assist | Score 3-2',
        content: 'Unbelievable match under the stadium lights. Scored the winning goal in the 90th minute!',
        victoryMessage: 'Gave everything on the pitch for the championship.',
        stars: 3,
        tags: ['Finals', 'Championship', 'Victory']
      })
    });
    const data = await res.json();
    if (!res.ok || !data.memoryId) throw new Error('Memory creation failed');
    testMemoryId = data.memoryId;
  });

  // 5. Test Memory Retrieval (MongoDB)
  await test('GET /api/memories/:userId (Fetch Chronological Timeline)', async () => {
    const res = await fetch(`${baseUrl}/api/memories/${testUserId}`);
    const data = await res.json();
    if (!res.ok || !Array.isArray(data.memories) || data.memories.length === 0) {
      throw new Error('Memories retrieval failed');
    }
  });

  // 6. Test Semantic Search
  await test('GET /api/memories/search/:userId (Filter by Keyword)', async () => {
    const res = await fetch(`${baseUrl}/api/memories/search/${testUserId}?q=Championship`);
    const data = await res.json();
    if (!res.ok || data.count === 0) throw new Error('Search failed to find keyword');
  });

  // 7. Test AI Younger Self Chat
  await test('POST /api/chat (Generate Era-Grounded AI Persona Response)', async () => {
    const res = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: testUserId,
        era: 'Youth Era (2018-2020)',
        userMessage: 'How did it feel scoring that final goal?'
      })
    });
    const data = await res.json();
    if (!res.ok || !data.response) throw new Error('AI Chat response failed');
  });

  // 8. Test Wellness Analytics
  await test('GET /api/analytics/:userId (Calculate Emotional Trajectory)', async () => {
    const res = await fetch(`${baseUrl}/api/analytics/${testUserId}`);
    const data = await res.json();
    if (!res.ok || !data.burnoutRisk) throw new Error('Analytics calculation failed');
  });

  // 9. Test GDPR Archive Export
  await test('GET /api/users/:userId/export (GDPR Data Export)', async () => {
    const res = await fetch(`${baseUrl}/api/users/${testUserId}/export`);
    const data = await res.json();
    if (!res.ok || !data.timelineMemories || !data.aiChatHistory) {
      throw new Error('Data export failed');
    }
  });

  // 10. Test Account & Memory Deletion
  await test('DELETE /api/users/:userId (GDPR Cascading Account Wipe)', async () => {
    const res = await fetch(`${baseUrl}/api/users/${testUserId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) throw new Error('Account deletion failed');
  });

  console.log(`\n🏁 Test Results: ${passed}/${total} Tests Passed (${Math.round((passed/total)*100)}% Success Rate)`);
}

runTests().catch(console.error);
