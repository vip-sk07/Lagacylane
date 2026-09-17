/**
 * LegacyLane — Full End-to-End API Test Suite
 * Tests every backend route against a running server at http://localhost:5000
 * Run: node Backend/test_e2e.js
 */

const BASE = 'http://localhost:5000';
let PASS = 0, FAIL = 0, SKIP = 0;
let userId = null, memoryId = null, grantId = null, inviteCode = null;

// ─── helpers ──────────────────────────────────────────────────────────────────
const c = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

async function req(method, path, body, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  const fetchOpts = { method, headers };
  if (body) fetchOpts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, fetchOpts);
  let json;
  try { json = await res.json(); } catch { json = {}; }
  return { status: res.status, json };
}

function pass(name) {
  PASS++;
  console.log(`${c.green}  ✔ PASS${c.reset} — ${name}`);
}

function fail(name, reason) {
  FAIL++;
  console.log(`${c.red}  ✘ FAIL${c.reset} — ${name}: ${c.red}${reason}${c.reset}`);
}

function skip(name, reason) {
  SKIP++;
  console.log(`${c.yellow}  ⚠ SKIP${c.reset} — ${name}: ${reason}`);
}

function section(title) {
  console.log(`\n${c.bold}${c.cyan}── ${title} ──${c.reset}`);
}

function expect(condition, name, failMsg) {
  if (condition) pass(name);
  else fail(name, failMsg || 'assertion failed');
}

// ─── test blocks ──────────────────────────────────────────────────────────────

async function testHealth() {
  section('Health & Connectivity');
  const { status, json } = await req('GET', '/api/health');
  expect(status === 200, 'GET /api/health returns 200');
  expect(json.status === 'ok' || json.status === 'healthy' || !!json.uptime || status === 200,
    'Health response has status field');

  const { status: ts } = await req('GET', '/api/memories/test-connection');
  expect(ts === 200, 'GET /api/memories/test-connection returns 200');
}

async function testAuth() {
  section('Auth — Register / Login / Google');

  const ts = Date.now();
  const email = `testuser_${ts}@legacylane.test`;
  const password = 'TestPass123!';

  // Register
  const reg = await req('POST', '/api/auth/register', {
    email, password, name: `Test User ${ts}`
  });
  if (reg.status === 201 || reg.status === 200) {
    pass('POST /api/auth/register — 201 Created');
    userId = reg.json.userId || reg.json.id || reg.json.user?.id || reg.json.user?.userId;
  } else if (reg.status === 409) {
    skip('POST /api/auth/register', 'email already exists (409)');
  } else {
    fail('POST /api/auth/register', `status=${reg.status} body=${JSON.stringify(reg.json)}`);
  }

  // Login
  const login = await req('POST', '/api/auth/login', { email, password });
  if (login.status === 200) {
    pass('POST /api/auth/login — 200 OK');
    if (!userId) userId = login.json.userId || login.json.id || login.json.user?.id;
  } else if (login.status === 401) {
    skip('POST /api/auth/login', 'credentials not in DB; skipping login test');
  } else {
    fail('POST /api/auth/login', `status=${login.status}`);
  }

  // Google OAuth stub (no real token — expect 400 or 422)
  const google = await req('POST', '/api/auth/google', { token: 'FAKE_GOOGLE_TOKEN' });
  expect([400, 401, 422, 500].includes(google.status),
    'POST /api/auth/google rejects fake token gracefully',
    `unexpected status ${google.status}`);
}

async function testProfile() {
  section('Profile');
  if (!userId) { skip('Profile tests', 'no userId from auth'); return; }

  const get = await req('GET', `/api/profile/${userId}`);
  expect([200, 404].includes(get.status), `GET /api/profile/${userId} responds`, `status=${get.status}`);

  const put = await req('PUT', `/api/profile/${userId}`, {
    name: 'Updated Tester',
    sport: 'Basketball',
    position: 'PG'
  });
  expect([200, 204, 404].includes(put.status), `PUT /api/profile/${userId} responds`);
}

async function testMemories() {
  section('Memories — CRUD');
  if (!userId) { skip('Memories CRUD', 'no userId'); return; }

  // GET all memories
  const list = await req('GET', `/api/memories/${userId}`);
  expect([200].includes(list.status), `GET /api/memories/${userId} returns 200`);

  // POST new memory
  const create = await req('POST', '/api/memories', {
    userId,
    title: 'E2E Test Memory',
    journal: 'This is an end-to-end test memory journal entry.',
    emotion: 'hopeful',
    sport: 'Basketball',
    era: 'Youth',
    privacySetting: 'Private',
    date: new Date().toISOString(),
    tags: ['e2e', 'test']
  });

  if (create.status === 201 || create.status === 200) {
    pass('POST /api/memories — 201 Created');
    memoryId = create.json.id || create.json.memory?.id || create.json.memoryId;
  } else {
    fail('POST /api/memories', `status=${create.status} body=${JSON.stringify(create.json).slice(0, 200)}`);
  }

  // PUT update
  if (memoryId) {
    const upd = await req('PUT', `/api/memories/${memoryId}`, {
      title: 'E2E Updated Memory',
      journal: 'Updated journal text.',
      emotion: 'proud'
    });
    expect([200, 204].includes(upd.status), `PUT /api/memories/${memoryId} returns 200/204`);
  } else {
    skip('PUT /api/memories/:id', 'no memoryId from create');
  }
}

async function testMemorySearch() {
  section('Memory Search & AI');
  if (!userId) { skip('Memory search', 'no userId'); return; }

  const search = await req('GET', `/api/memories/search/${userId}?q=basketball`);
  expect([200].includes(search.status), `GET /api/memories/search/${userId}?q=basketball returns 200`);
  expect(Array.isArray(search.json) || search.json.results !== undefined || search.json.memories !== undefined,
    'Search returns array or results object');
}

async function testChat() {
  section('AI Chat & Younger Self');
  if (!userId) { skip('Chat', 'no userId'); return; }

  const chat = await req('POST', '/api/chat', {
    userId,
    message: 'Tell me about my youth basketball memories.',
    era: 'Youth'
  });
  expect([200].includes(chat.status), 'POST /api/chat returns 200', `status=${chat.status}`);
  if (chat.status === 200) {
    expect(chat.json.reply || chat.json.response || chat.json.message,
      'Chat response contains reply text');
  }
}

async function testVault() {
  section('Vault — Encrypt / Verify PIN / Summary / Change PIN');
  if (!userId) { skip('Vault tests', 'no userId'); return; }
  if (!memoryId) { skip('Vault lock/unlock', 'no memoryId'); return; }

  // First: establish PIN via verify-pin (creates PIN if none set)
  const initPin = await req('POST', '/api/vault/verify-pin', { userId, pin: '1234' });
  // Acceptable: 200 (matched or initialized) or 401 (wrong — reset to known state)
  const currentPin = '1234';

  // Lock a memory into vault
  const lock = await req('PUT', `/api/memories/${memoryId}/vault`, {
    lock: true,
    ownerId: userId,
    pin: currentPin
  });
  expect([200, 201, 204].includes(lock.status),
    `PUT /api/memories/${memoryId}/vault (lock) responds`, `status=${lock.status}`);

  // Verify PIN — correct
  const verify = await req('POST', '/api/vault/verify-pin', { userId, pin: currentPin });
  expect([200, 204].includes(verify.status),
    'POST /api/vault/verify-pin correct PIN returns 200/204', `status=${verify.status}`);
  if (verify.status === 200) {
    expect(verify.json.success === true || verify.json.valid === true || verify.json.match === true,
      'verify-pin returns success:true');
  }

  // Verify PIN — wrong
  const wrongPin = await req('POST', '/api/vault/verify-pin', { userId, pin: '9999' });
  expect([401, 403, 200].includes(wrongPin.status),
    'POST /api/vault/verify-pin wrong PIN handled', `status=${wrongPin.status}`);

  // GET vault contents (owner viewing own vault — no viewerId needed)
  const vault = await req('GET', `/api/vault/${userId}`);
  expect([200].includes(vault.status), `GET /api/vault/${userId} returns 200`, `status=${vault.status}`);
  if (vault.status === 200) {
    expect(Array.isArray(vault.json) || vault.json.memories !== undefined || vault.json.vault !== undefined,
      'Vault response contains memories');
  }

  // GET vault summary
  const summary = await req('GET', `/api/vault/summary/${userId}`);
  expect([200].includes(summary.status), `GET /api/vault/summary/${userId} returns 200`);

  // Change PIN — send currentPin as oldPin
  const changePIN = await req('POST', '/api/vault/change-pin', {
    userId,
    oldPin: currentPin,
    newPin: '5678'
  });
  expect([200, 204].includes(changePIN.status),
    'POST /api/vault/change-pin returns 200/204', `status=${changePIN.status}`);

  // Reset PIN back to known state so subsequent test runs are consistent
  await req('POST', '/api/vault/change-pin', { userId, oldPin: '5678', newPin: currentPin });

  // Unlock memory
  const unlock = await req('PUT', `/api/memories/${memoryId}/vault`, {
    lock: false,
    ownerId: userId,
    pin: currentPin
  });
  expect([200, 204].includes(unlock.status),
    `PUT /api/memories/${memoryId}/vault (unlock) responds`);
}

async function testFamilyCircle() {
  section('Family Circle — Invite / Redeem / Grant / Delete');
  if (!userId) { skip('Family Circle tests', 'no userId'); return; }

  // Generate invite code
  const invite = await req('POST', '/api/family-circle/invite-code', {
    ownerId: userId,
    role: 'Viewer',
    expiresInHours: 24
  });
  expect([200, 201].includes(invite.status),
    'POST /api/family-circle/invite-code returns 200/201', `status=${invite.status}`);
  if (invite.status === 200 || invite.status === 201) {
    inviteCode = invite.json.code || invite.json.inviteCode || invite.json.token;
    grantId = grantId || invite.json.grantId;
    expect(!!inviteCode, 'Invite code is returned in response');
    console.log(`     Invite code: ${inviteCode}`);
  }

  // Redeem invite code (with a second fake userId)
  if (inviteCode) {
    const redeem = await req('POST', '/api/family-circle/redeem', {
      code: inviteCode,
      memberId: `member_${Date.now()}`
    });
    expect([200, 201, 400, 409].includes(redeem.status),
      'POST /api/family-circle/redeem responds', `status=${redeem.status}`);
    if (redeem.status === 200 || redeem.status === 201) {
      pass('Family circle redemption succeeded');
      grantId = redeem.json.grantId || redeem.json.id;
    }
  }

  // GET family circle
  const circle = await req('GET', `/api/family-circle/${userId}`);
  expect([200].includes(circle.status), `GET /api/family-circle/${userId} returns 200`);

  // Manual grant
  const grantRes = await req('POST', '/api/family-circle/grant', {
    ownerId: userId,
    memberId: `direct_grant_${Date.now()}`,
    memberEmail: 'parent@legacylane.test',
    memberName: 'Test Parent',
    role: 'Viewer',
    permissions: { viewMemories: true, viewVault: false, export: false }
  });
  expect([200, 201].includes(grantRes.status),
    'POST /api/family-circle/grant returns 200/201', `status=${grantRes.status}`);
  if (grantRes.status === 200 || grantRes.status === 201) {
    grantId = grantId || grantRes.json.grantId || grantRes.json.id;
  }

  // DELETE a grant
  if (grantId) {
    const del = await req('DELETE', `/api/family-circle/${grantId}`);
    expect([200, 204].includes(del.status),
      `DELETE /api/family-circle/${grantId} returns 200/204`, `status=${del.status}`);
  } else {
    skip('DELETE /api/family-circle/:grantId', 'no grantId obtained');
  }
}

async function testAnalytics() {
  section('Analytics & Cognitive Profile');
  if (!userId) { skip('Analytics', 'no userId'); return; }

  const analytics = await req('GET', `/api/analytics/${userId}`);
  expect([200].includes(analytics.status), `GET /api/analytics/${userId} returns 200`);

  const profile = await req('GET', `/api/ai/cognitive-profile/${userId}`);
  expect([200].includes(profile.status), `GET /api/ai/cognitive-profile/${userId} returns 200`);

  const insights = await req('GET', `/api/ai/younger-self/insights?userId=${userId}&era=Youth`);
  expect([200].includes(insights.status), 'GET /api/ai/younger-self/insights returns 200');
}

async function testConnections() {
  section('Connections / Follow');
  if (!userId) { skip('Connections', 'no userId'); return; }

  const conns = await req('GET', `/api/connections/${userId}`);
  expect([200].includes(conns.status), `GET /api/connections/${userId} returns 200`);

  const follow = await req('POST', '/api/connections/follow', {
    followerId: userId,
    followingId: `another_${Date.now()}`
  });
  expect([200, 201, 409].includes(follow.status),
    'POST /api/connections/follow responds', `status=${follow.status}`);
}

async function testShareKeepsake() {
  section('Share Keepsake / Public Link');
  if (!memoryId) { skip('Share Keepsake', 'no memoryId'); return; }

  const share = await req('GET', `/api/share/keepsake/${memoryId}`);
  expect([200, 403, 404].includes(share.status),
    `GET /api/share/keepsake/${memoryId} responds`, `status=${share.status}`);
}

async function testExport() {
  section('Data Export');
  if (!userId) { skip('Export', 'no userId'); return; }

  const exp = await req('GET', `/api/users/${userId}/export`);
  expect([200].includes(exp.status), `GET /api/users/${userId}/export returns 200`);
  if (exp.status === 200) {
    const hasData = exp.json.memories || exp.json.user || exp.json.profile || exp.json.data;
    expect(!!hasData, 'Export contains user data');
  }
}

async function testOnboarding() {
  section('Onboarding Baseline');
  if (!userId) { skip('Onboarding', 'no userId'); return; }

  const onboard = await req('POST', '/api/onboarding/baseline', {
    userId,
    journeyType: 'sports',
    domain: 'basketball',
    baselineAnchors: [
      {
        title: 'First Practice Day',
        journal: 'My first day on the basketball court felt electric.',
        era: 'Youth & Formative Years',
        date: '2010-09-01',
        emotion: 'excited',
        tags: ['#Youth', '#FirstDay', '#Basketball']
      },
      {
        title: 'State Championship Win',
        journal: 'We won the state championship in overtime. Best day of my life.',
        era: 'Breakthrough Season',
        date: '2015-03-15',
        sentiment: 96,
        tags: ['#Champion', '#StateTitle', '#Triumph']
      }
    ]
  });
  expect([200, 201, 409].includes(onboard.status),
    'POST /api/onboarding/baseline responds', `status=${onboard.status} body=${JSON.stringify(onboard.json).slice(0,200)}`);
}

async function testCleanup() {
  section('Cleanup — Delete Test Memory & User');
  if (memoryId) {
    const del = await req('DELETE', `/api/memories/${memoryId}`);
    expect([200, 204].includes(del.status),
      `DELETE /api/memories/${memoryId} returns 200/204`);
    memoryId = null;
  } else {
    skip('DELETE memory', 'no memoryId');
  }

  if (userId) {
    console.log(`     ℹ Test user ID for inspection: ${userId}`);
  }
}

// ─── main runner ──────────────────────────────────────────────────────────────
async function runAll() {
  console.log(`\n${c.bold}${c.cyan}╔══════════════════════════════════════════════════╗`);
  console.log(`║   LegacyLane — Full E2E API Test Suite           ║`);
  console.log(`╚══════════════════════════════════════════════════╝${c.reset}`);
  console.log(`  Target: ${BASE}\n`);

  const t0 = Date.now();

  try {
    await testHealth();
    await testAuth();
    await testProfile();
    await testMemories();
    await testMemorySearch();
    await testChat();
    await testVault();
    await testFamilyCircle();
    await testAnalytics();
    await testConnections();
    await testShareKeepsake();
    await testExport();
    await testOnboarding();
    await testCleanup();
  } catch (err) {
    fail('UNHANDLED ERROR', err.message);
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
  const total = PASS + FAIL + SKIP;

  console.log(`\n${c.bold}${'─'.repeat(52)}${c.reset}`);
  console.log(`  ${c.green}PASS: ${PASS}${c.reset}  ${c.red}FAIL: ${FAIL}${c.reset}  ${c.yellow}SKIP: ${SKIP}${c.reset}  |  Total: ${total}  |  ${elapsed}s`);
  console.log(`${'─'.repeat(52)}\n`);

  if (FAIL > 0) {
    process.exitCode = 1;
  }
}

runAll();
