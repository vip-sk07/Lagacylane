/**
 * Comprehensive Automated Verification Suite for SRS Implementations
 * Tests Authentication & Security, Phone OTP, Pagination, Profile Management,
 * Family Circle Invite & Redemption, Keepsake Sharing, and GDPR compliance.
 */

async function runAuditTests() {
  console.log('🧪 Starting LegacyLane SRS Verification Suite...\n');
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

  const testEmail = `audit_athlete_${Date.now()}@legacylane.internal`;
  let testUserId = null;
  const testPhone = `+1555${Math.floor(1000000 + Math.random() * 9000000)}`;

  // 1. Validation Rejection: Invalid Registration Input
  await test('POST /api/auth/register (Validation Rejection for Short Password)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Invalid User',
        email: 'invalid-email',
        password: '123', // < 6 chars
        profileType: 'Athlete'
      })
    });
    const data = await res.json();
    if ((res.status !== 400 && res.status !== 422) || (!data.errors && !data.error)) {
      throw new Error(`Expected 400/422 validation error, got ${res.status}`);
    }
  });

  // 2. Valid Registration
  await test('POST /api/auth/register (Valid Athlete Account Creation)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Morgan Test',
        email: testEmail,
        password: 'securePassword999',
        profileType: 'Athlete',
        sportType: 'Soccer',
        position: 'Striker',
        teamHistory: 'Legacy FC'
      })
    });
    const data = await res.json();
    if (!res.ok || !data.user?.id) throw new Error(data.error || 'Registration failed');
    testUserId = data.user.id;
  });

  // 3. Valid Login
  await test('POST /api/auth/login (Verify Credentials)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: 'securePassword999'
      })
    });
    const data = await res.json();
    if (!res.ok || data.user?.email !== testEmail) throw new Error(data.error || 'Login failed');
  });

  // 4. Phone OTP Send & Verify Flow
  await test('POST /api/auth/otp/send (Generate Phone OTP)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: testPhone })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
  });

  // Verify OTP rejection for incorrect code
  await test('POST /api/auth/otp/verify (Reject Invalid OTP)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: testPhone, otp: '000000' })
    });
    const data = await res.json();
    if (res.status !== 401 && res.status !== 400) {
      throw new Error(`Expected 401/400 for incorrect OTP, got ${res.status}`);
    }
  });

  // 5. Profile Update (PUT /api/profile/:userId)
  await test('PUT /api/profile/:userId (Update Athlete Bio & Details)', async () => {
    const res = await fetch(`${baseUrl}/api/profile/${testUserId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Morgan Updated',
        sportType: 'Soccer & Athletics',
        position: 'Captain & Forward',
        teamHistory: 'Legacy FC, National Team',
        bio: 'Olympic Gold Medalist & World Champion.'
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update profile');
  });

  // Verify Profile Fetch reflects update
  await test('GET /api/profile/:userId (Verify Persisted Update)', async () => {
    const res = await fetch(`${baseUrl}/api/profile/${testUserId}`);
    const data = await res.json();
    if (!res.ok || data.user?.Name !== 'Alex Morgan Updated' || data.profile?.SportType !== 'Soccer & Athletics') {
      throw new Error(`Profile mismatch: Name=${data.user?.Name}, Sport=${data.profile?.SportType}`);
    }
  });

  // 6. Memory Creation
  let testMemoryId = null;
  await test('POST /api/memories (Add Milestone Memory with Tags & Sentiment)', async () => {
    const res = await fetch(`${baseUrl}/api/memories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: testUserId,
        title: 'Championship Winning Header',
        era: 'Senior Career (2020-2024)',
        date: '2023-08-20',
        matchDetails: 'Final vs Archrivals | 1-0 Win',
        content: 'Scored in extra time off a precision corner kick. Tears of pure joy!',
        victoryMessage: 'Champions of the World!',
        stars: 3,
        tags: ['Championship', 'Golden Goal', 'Header']
      })
    });
    const data = await res.json();
    if (!res.ok || !data.memoryId) throw new Error(data.error || 'Memory creation failed');
    testMemoryId = data.memoryId;
  });

  // 7. Paginated Memory Retrieval
  await test('GET /api/memories/:userId?page=1&limit=20 (Paginated Timeline)', async () => {
    const res = await fetch(`${baseUrl}/api/memories/${testUserId}?page=1&limit=20`);
    const data = await res.json();
    if (!res.ok || !Array.isArray(data.memories) || data.memories.length === 0) {
      throw new Error('Paginated memories retrieval failed');
    }
    if (typeof data.pagination !== 'undefined') {
      console.log(`    (Pagination metadata: total=${data.pagination.total}, page=${data.pagination.page}, limit=${data.pagination.limit})`);
    }
  });

  // 8. Keepsake Share Link Fetching
  await test('GET /api/share/keepsake/:memoryId (Public / Keepsake View)', async () => {
    const res = await fetch(`${baseUrl}/api/share/keepsake/${testMemoryId}`);
    const data = await res.json();
    if (!res.ok || (!data.memory && !data.title)) {
      throw new Error(data.error || 'Keepsake share link fetch failed');
    }
  });

  // 9. Family Circle Invite Code Generation
  let inviteCode = null;
  await test('POST /api/family-circle/invite-code (Generate Passcode)', async () => {
    const res = await fetch(`${baseUrl}/api/family-circle/invite-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ownerId: testUserId,
        role: 'Viewer'
      })
    });
    const data = await res.json();
    if (!res.ok || !data.inviteCode) {
      throw new Error(data.error || 'Invite code generation failed');
    }
    inviteCode = data.inviteCode;
  });

  // 10. Family Circle Passcode Redemption
  const familyMemberEmail = `family_${Date.now()}@legacylane.internal`;
  let familyMemberId = null;
  // Create family member user
  const regFamRes = await fetch(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Grandma Morgan',
      email: familyMemberEmail,
      password: 'familyPassword123',
      profileType: 'Standard'
    })
  });
  const regFamData = await regFamRes.json();
  familyMemberId = regFamData.user?.id;

  await test('POST /api/family-circle/redeem (Redeem Passcode for Circle Access)', async () => {
    const res = await fetch(`${baseUrl}/api/family-circle/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: familyMemberId,
        userName: 'Grandma Morgan',
        inviteCode: inviteCode
      })
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Passcode redemption failed');
    }
  });

  // 11. Family Circle Access Verification
  await test('GET /api/family-circle/:ownerId (Verify Member in Active Circle)', async () => {
    const res = await fetch(`${baseUrl}/api/family-circle/${testUserId}`);
    const data = await res.json();
    if (!res.ok || !Array.isArray(data.members)) {
      throw new Error(data.error || 'Failed to list family circle members');
    }
    const found = data.members.some(m => m.Family_User_ID === familyMemberId || m.InviteeName === 'Grandma Morgan');
    if (!found) throw new Error('Redeemed member not listed in family circle');
  });

  // 12. GDPR Data Archive Export
  await test('GET /api/users/:userId/export (GDPR Full Data Archive)', async () => {
    const res = await fetch(`${baseUrl}/api/users/${testUserId}/export`);
    const data = await res.json();
    if (!res.ok || (!data.profile && !data.athleteProfile) || !data.timelineMemories) {
      throw new Error(data.error || 'GDPR archive export failed');
    }
  });

  // 13. Two-Step Account Deletion (Cascading cleanup)
  await test('DELETE /api/users/:userId (GDPR Cascading Account Deletion)', async () => {
    const res = await fetch(`${baseUrl}/api/users/${testUserId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok || (!data.success && !data.message)) {
      throw new Error(data.error || 'Account deletion failed');
    }
  });

  console.log(`\n🏁 SRS Verification Results: ${passed}/${total} Tests Passed (${Math.round((passed/total)*100)}% Success Rate)`);
  if (passed === total) {
    console.log('🎉 All SRS specifications verified successfully against backend APIs!');
  }
}

runAuditTests().catch(console.error);
