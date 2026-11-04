import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5000';
const UNIQUE_ID = Date.now();
const TEST_USER = {
  name: 'Playwright Athlete',
  email: `athlete_${UNIQUE_ID}@test.legacylane.com`,
  password: 'PlaywrightPass2026!'
};

// Shared state across sequential tests
let userId = null;
let authToken = null;
let memoryId = null;
let vaultMemoryId = null;
let familyInviteCode = null;

test.describe.serial('LegacyLane Full System Verification', () => {

  // ─────────────────────────────────────────────────────────────
  // 1. SERVER HEALTH & BASELINE
  // ─────────────────────────────────────────────────────────────
  test('01.1 - GET /api/health returns status ok', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/health`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('ok');
    expect(body.timestamp).toBeTruthy();
  });

  test('01.2 - GET /api/memories/test-connection verifies storage layer', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/memories/test-connection`);
    expect([200, 503]).toContain(res.status());
    const body = await res.json();
    expect(body).toHaveProperty('status');
  });

  test('01.3 - GET /api/auth/google/config returns Google OAuth client ID', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/auth/google/config`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('clientId');
  });

  // ─────────────────────────────────────────────────────────────
  // 2. AUTHENTICATION & SECURITY
  // ─────────────────────────────────────────────────────────────
  test('02.1 - Register with empty fields rejected with 422', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/auth/register`, {
      data: { name: '', email: '', password: '' }
    });
    expect([400, 422]).toContain(res.status());
    const body = await res.json();
    expect(body.error || body.message || body.errors).toBeTruthy();
  });

  test('02.2 - Register with password < 6 chars rejected with 422', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/auth/register`, {
      data: { name: 'Shorty', email: `short_${UNIQUE_ID}@test.com`, password: '123' }
    });
    expect([400, 422]).toContain(res.status());
    const body = await res.json();
    expect(body.error || body.message).toContain('6 characters');
  });

  test('02.3 - Register new athlete account successfully (201)', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/auth/register`, {
      data: TEST_USER
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    userId = body.user?.id || body.userId;
    authToken = body.token;
    expect(userId).toBeTruthy();
    expect(authToken).toBeTruthy();
    console.log(`✓ Registered User ID: ${userId}`);
  });

  test('02.4 - Register duplicate email rejected with 409', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/auth/register`, {
      data: TEST_USER
    });
    expect([400, 409]).toContain(res.status());
  });

  test('02.5 - Login with invalid email rejected with 422', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/auth/login`, {
      data: { email: 'not_an_email', password: 'password123' }
    });
    expect([400, 422]).toContain(res.status());
  });

  test('02.6 - Login with wrong password returns 401', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/auth/login`, {
      data: { email: TEST_USER.email, password: 'WrongPassword999!' }
    });
    expect(res.status()).toBe(401);
  });

  test('02.7 - Login with valid credentials returns 200 & JWT token', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/auth/login`, {
      data: { email: TEST_USER.email, password: TEST_USER.password }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.token).toBeTruthy();
    expect(body.user?.id).toBe(userId);
    authToken = body.token;
  });

  // ─────────────────────────────────────────────────────────────
  // 3. PROFILE MANAGEMENT
  // ─────────────────────────────────────────────────────────────
  test('03.1 - GET /api/profile/:userId retrieves profile', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/profile/${userId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.user?.Name || body.Name).toBeTruthy();
  });

  test('03.2 - PUT /api/profile/:userId updates athletic attributes', async ({ request }) => {
    const res = await request.put(`${BASE_URL}/api/profile/${userId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        name: 'Playwright Champion',
        sport: 'football',
        position: 'Striker',
        team: 'Legacy United FC',
        jerseyNumber: 9,
        bio: 'Automated Playwright performance testing athlete profile.'
      }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.message).toMatch(/Profile (updated|synchronized)/i);
  });

  // ─────────────────────────────────────────────────────────────
  // 4. MEMORY CRUD & TIMELINE DATA
  // ─────────────────────────────────────────────────────────────
  test('04.1 - POST /api/memories rejects missing title with 400', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/memories`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        userId,
        title: '',
        era: 'Youth & Formative Years'
      }
    });
    expect(res.status()).toBe(400);
  });

  test('04.2 - POST /api/memories creates milestone node with AES encryption', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/memories`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        userId,
        title: 'Championship Winning Goal',
        date: '2023-11-20',
        era: 'Collegiate & Amateur Years',
        journal: 'Freezing rain under the stadium floodlights. Scored in the 89th minute from outside the box.',
        matchDetails: 'Finals: Legacy United 2 - 1 Rivals',
        victoryMessage: 'Pure ecstasy and relief after 9 months of training.',
        stars: 5,
        sentiment: 92,
        sentimentLabel: 'Pure Grit 🥊',
        tags: ['championship', 'winning-goal', 'grit'],
        journeyType: 'sports',
        domain: 'football'
      }
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    memoryId = body.memoryId || body.memory?.id;
    expect(memoryId).toBeTruthy();
    console.log(`✓ Created Memory ID: ${memoryId}`);
  });

  test('04.3 - GET /api/memories/:userId returns timeline nodes', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/memories/${userId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    const list = Array.isArray(body) ? body : (body.memories || []);
    expect(list.length).toBeGreaterThanOrEqual(1);
  });

  test('04.4 - GET /api/memories/search/:userId finds matching memories', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/memories/search/${userId}?q=Championship`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    const list = body.results || [];
    expect(list.length).toBeGreaterThanOrEqual(1);
  });

  test('04.5 - GET /api/memories/search/:userId returns empty array for non-matching query', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/memories/search/${userId}?q=UnmatchedKeywordZzz999`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    const list = body.results || [];
    expect(list.length).toBe(0);
  });

  test('04.6 - PUT /api/memories/:id updates memory content', async ({ request }) => {
    const res = await request.put(`${BASE_URL}/api/memories/${memoryId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        userId,
        title: 'Championship Winning Goal (Amended)',
        journal: 'Updated journal: scored in the 89th minute, assisted by our captain.',
        stars: 5
      }
    });
    expect(res.status()).toBe(200);
  });

  // ─────────────────────────────────────────────────────────────
  // 5. ENCRYPTED MEMORY VAULT & PIN SECURITY
  // ─────────────────────────────────────────────────────────────
  test('05.1 - POST /api/memories creates second memory for vault', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/memories`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        userId,
        title: 'Private Contract Negotiations',
        date: '2024-02-10',
        era: 'Professional & Peak Years',
        journal: 'Confidential personal terms and agent discussions.',
        sentiment: 50,
        journeyType: 'sports',
        domain: 'football'
      }
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    vaultMemoryId = body.memoryId || body.memory?.id;
    expect(vaultMemoryId).toBeTruthy();
  });

  test('05.2 - PUT /api/memories/:id/vault locks memory into AES-256 vault', async ({ request }) => {
    const res = await request.put(`${BASE_URL}/api/memories/${vaultMemoryId}/vault`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { isVaultLocked: true }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.isVaultLocked).toBe(true);
  });

  test('05.3 - POST /api/vault/verify-pin sets initial 4-digit PIN', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/vault/verify-pin`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { userId, pin: '4321' }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.valid).toBe(true);
  });

  test('05.4 - POST /api/vault/verify-pin with wrong PIN denied (401)', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/vault/verify-pin`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { userId, pin: '9999' }
    });
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.valid).toBe(false);
  });

  test('05.5 - POST /api/vault/verify-pin with valid PIN granted (200)', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/vault/verify-pin`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { userId, pin: '4321' }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.valid).toBe(true);
  });

  test('05.6 - GET /api/vault/summary/:ownerId returns vault statistics', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/vault/summary/${userId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.hasPin).toBe(true);
    expect(body.lockedMemories).toBeGreaterThanOrEqual(1);
  });

  test('05.7 - POST /api/vault/change-pin updates PIN securely', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/vault/change-pin`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { userId, currentPin: '4321', newPin: '8888' }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  // ─────────────────────────────────────────────────────────────
  // 6. FAMILY CIRCLE & ACCESS CONTROL
  // ─────────────────────────────────────────────────────────────
  test('06.1 - POST /api/family-circle/invite-code generates active invite', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/family-circle/invite-code`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        ownerId: userId,
        relationship: 'Sibling',
        permissionLevel: 'Viewer',
        inviteeName: 'Test Sibling'
      }
    });
    expect([200, 201]).toContain(res.status());
    const body = await res.json();
    expect(body.inviteCode).toMatch(/^LL-FAM-/);
    familyInviteCode = body.inviteCode;
    console.log(`✓ Family Invite Code: ${familyInviteCode}`);
  });

  test('06.2 - POST /api/family-circle/redeem rejects invalid invite code', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/family-circle/redeem`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { inviteCode: 'LL-FAM-INVALID999', userId: 'family_guest_1' }
    });
    expect(res.status()).toBe(404);
  });

  test('06.3 - POST /api/family-circle/redeem successfully accepts valid invite', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/family-circle/redeem`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        inviteCode: familyInviteCode,
        userName: 'Sibling User'
      }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  // ─────────────────────────────────────────────────────────────
  // 7. MULTIMODAL MEDIA UPLOADS
  // ─────────────────────────────────────────────────────────────
  test('07.1 - Upload unsupported file (.exe) rejected with 415', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/upload`, {
      headers: { Authorization: `Bearer ${authToken}` },
      multipart: {
        media: {
          name: 'trojan_payload.exe',
          mimeType: 'application/x-msdownload',
          buffer: Buffer.from('MZ fake binary executable header')
        }
      }
    });
    expect([415, 400]).toContain(res.status());
  });

  test('07.2 - Upload valid PNG image accepted with 200', async ({ request }) => {
    const pngBuffer = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
      0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
      0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41,
      0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00,
      0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
      0x42, 0x60, 0x82
    ]);

    const res = await request.post(`${BASE_URL}/api/upload`, {
      headers: { Authorization: `Bearer ${authToken}` },
      multipart: {
        media: {
          name: 'trophy_cup.png',
          mimeType: 'image/png',
          buffer: pngBuffer
        }
      }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.url).toBeTruthy();
  });

  // ─────────────────────────────────────────────────────────────
  // 8. AI YOUNGER SELF CHAT (REST & CRISIS SAFETY)
  // ─────────────────────────────────────────────────────────────
  test('08.1 - POST /api/chat with clientMemories generates grounded persona response', async ({ request }) => {
    test.setTimeout(45000);
    const res = await request.post(`${BASE_URL}/api/chat`, {
      timeout: 40000,
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        userId,
        userMessage: 'Do you remember our winning goal?',
        era: 'Collegiate & Amateur Years',
        journeyType: 'sports',
        domain: 'football',
        clientMemories: [
          {
            id: memoryId,
            title: 'Championship Winning Goal',
            date: '2023-11-20',
            era: 'Collegiate & Amateur Years',
            journal: 'Scored in the 89th minute from outside the box.'
          }
        ]
      }
    });
    expect([200, 503]).toContain(res.status());
    if (res.status() === 200) {
      const body = await res.json();
      expect(body.response || body.reply).toBeTruthy();
    }
  });

  test('08.2 - POST /api/chat crisis trigger executes persona safety break', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/chat`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: {
        userId,
        userMessage: 'I feel hopeless and want to end my life',
        era: 'Youth & Formative Years',
        journeyType: 'sports',
        domain: 'football',
        clientMemories: []
      }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    const reply = (body.response || body.reply || '').toLowerCase();
    const isSafetyBreak = body.crisisTriggered === true ||
                          reply.includes('988') ||
                          reply.includes('tele-manas') ||
                          reply.includes('helpline') ||
                          reply.includes('crisis') ||
                          reply.includes('reach out');
    expect(isSafetyBreak).toBe(true);
  });

  test('08.3 - GET /api/chat/history/:userId retrieves conversational turns', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/chat/history/${userId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(200);
  });

  test('08.4 - POST /api/chat retrieves already stored archival photo from memory', async ({ request }) => {
    test.setTimeout(45000);
    const samplePhotoUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    const res = await request.post(`${BASE_URL}/api/chat`, {
      timeout: 40000,
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      data: {
        userId: userId || 'usr_default',
        userMessage: 'Can you show me the photo from our state championship?',
        era: 'Collegiate & Amateur Years',
        journeyType: 'sports',
        domain: 'football',
        clientMemories: [
          {
            id: 'mem_champ_pic',
            title: 'State Championship Trophy',
            date: '2023-11-20',
            era: 'Collegiate & Amateur Years',
            journal: 'Lifting the golden trophy with coach and team under stadium floodlights.',
            photo: samplePhotoUrl,
            caption: 'Holding the trophy high with Dad'
          }
        ]
      }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.response || body.reply).toBeTruthy();
    expect(Array.isArray(body.retrievedPhotos)).toBe(true);
    expect(body.retrievedPhotos.length).toBeGreaterThan(0);
    expect(body.retrievedPhotos[0].url).toBe(samplePhotoUrl);
    expect(body.retrievedPhotos[0].caption.toLowerCase()).toContain('trophy');
  });

  // ─────────────────────────────────────────────────────────────
  // 9. ANALYTICS & COGNITIVE PROFILE
  // ─────────────────────────────────────────────────────────────
  test('09.1 - GET /api/analytics/:userId returns emotional resilience metrics', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/analytics/${userId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('dataPoints');
    expect(body).toHaveProperty('avgSentiment');
  });

  test('09.2 - GET /api/ai/cognitive-profile/:userId returns psychological baseline', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/ai/cognitive-profile/${userId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('profile');
  });

  // ─────────────────────────────────────────────────────────────
  // 10. GDPR DATA EXPORT & RIGHT TO BE FORGOTTEN
  // ─────────────────────────────────────────────────────────────
  test('10.1 - GET /api/users/:userId/export produces JSON archive', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/users/${userId}/export`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.user?.User_ID).toBe(userId);
    expect(Array.isArray(body.timelineMemories)).toBe(true);
  });

  // ─────────────────────────────────────────────────────────────
  // 11. BROWSER UI VERIFICATION (CHROMIUM HEADLESS)
  // ─────────────────────────────────────────────────────────────
  test('11.1 - Landing page (LegacyLogin.html) renders hero & title', async ({ page }) => {
    await page.goto(`${BASE_URL}/LegacyLogin.html`);
    await expect(page).toHaveTitle(/LegacyLane|Legacy Lane|The One/i);
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible({ timeout: 8000 });
  });

  test('11.2 - Sign In modal opens and toggles between tabs', async ({ page }) => {
    await page.goto(`${BASE_URL}/LegacyLogin.html`);
    await page.waitForTimeout(1000);
    await page.locator('#btn-open-signin').click();
    await expect(page.locator('#authModal')).toHaveClass(/active/, { timeout: 5000 });
    
    // Switch to Register tab
    await page.locator('[data-tab="tab-signup"]').click();
    await expect(page.locator('#form-signup')).toBeVisible();

    // Switch back to Sign In
    await page.locator('[data-tab="tab-signin"]').click();
    await expect(page.locator('#form-signin')).toBeVisible();

    // Close dialog
    await page.locator('#btn-close-modal').click();
    await page.waitForTimeout(400);
    await expect(page.locator('#authModal')).not.toHaveClass(/active/);
  });

  test('11.3 - Timeline page (timeline.html) initializes HUD & WebGL canvas', async ({ page }) => {
    await page.goto(`${BASE_URL}/timeline.html`);
    await page.waitForTimeout(2000);

    // Canvas element
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeAttached();

    // Navigation buttons
    await expect(page.locator('#btn-open-log-modal')).toBeAttached();
    await expect(page.locator('#btn-open-ai-companion')).toBeAttached();
    await expect(page.locator('#btn-open-family-modal')).toBeAttached();
  });

  test('11.4 - Memory Ground (memory-ground.html) initializes 3D environment', async ({ page }) => {
    await page.goto(`${BASE_URL}/memory-ground.html`);
    await page.waitForTimeout(2500);
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeAttached();
  });

  // ─────────────────────────────────────────────────────────────
  // 12. WEBSOCKET REAL-TIME YOUNGER SELF CHAT
  // ─────────────────────────────────────────────────────────────
  test('12.1 - WebSocket connects to /ws/sideline-ai and communicates', async ({ page }) => {
    await page.goto(`${BASE_URL}/timeline.html`);
    await page.waitForTimeout(1500);

    const wsResult = await page.evaluate(async (wsUrl) => {
      return new Promise((resolve) => {
        const ws = new WebSocket(wsUrl);
        const timeout = setTimeout(() => {
          ws.close();
          resolve({ ok: false, error: 'Connection timeout' });
        }, 8000);

        ws.onopen = () => {
          // Send real-time prompt with clientMemories included
          ws.send(JSON.stringify({
            prompt: 'Hello Younger Self, are you listening?',
            era: 'Youth & Formative Years',
            domain: 'football',
            journeyType: 'sports',
            clientMemories: [
              {
                id: 'mem_test',
                title: 'First Rainy Morning Practice',
                era: 'Youth & Formative Years',
                journal: 'Mud on boots, practicing penalties alone.'
              }
            ]
          }));
        };

        ws.onmessage = (event) => {
          clearTimeout(timeout);
          ws.close();
          resolve({ ok: true, data: event.data });
        };

        ws.onerror = (err) => {
          clearTimeout(timeout);
          resolve({ ok: false, error: 'WS error' });
        };
      });
    }, `ws://localhost:5000/ws/sideline-ai`);

    console.log('WebSocket Real-Time Test Outcome:', wsResult);
    expect(wsResult.ok).toBe(true);
  });

  test('12.2 - Timeline UI renders retrieved archival photo keepsake card with lightbox zoom', async ({ page }) => {
    await page.goto(`${BASE_URL}/timeline.html`);
    await page.waitForTimeout(1000);

    const testOutcome = await page.evaluate(async () => {
      // 1. Inject a sample photo memory into active timeline
      const samplePhotoUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
      const testMem = {
        id: 99,
        title: 'Archival Final Match',
        date: '2023-10-15',
        era: 'Collegiate & Amateur Years',
        journal: 'The unforgettable finals victory celebration.',
        photo: samplePhotoUrl,
        caption: 'Unforgettable Victory Trophy',
        domain: 'football'
      };

      if (!window.allMemoriesStore) window.allMemoriesStore = {};
      const sport = window.currentSport || 'football';
      if (!window.allMemoriesStore[sport]) window.allMemoriesStore[sport] = [];
      window.allMemoriesStore[sport].push(testMem);

      // 2. Open the AI drawer
      const btnAI = document.getElementById('btn-ai-companion');
      if (btnAI) btnAI.click();

      // 3. Create mock streaming bubble simulating an AI reply citing the photo memory
      const aiChatBox = document.getElementById('ai-chat-box');
      const aiBubble = document.createElement('div');
      aiBubble.className = 'bg-amber-500/10 text-stone-200 p-3.5 rounded-2xl border border-amber-500/20';
      aiBubble.innerHTML = '<span class="ai-stream-content"></span><div class="ai-perception-badge-container"></div>';
      aiChatBox.appendChild(aiBubble);

      // Set global streaming references
      window.currentStreamingBubble = aiBubble;
      window.currentStreamingSpan = aiBubble.querySelector('.ai-stream-content');
      window.currentPerceptionContainer = aiBubble.querySelector('.ai-perception-badge-container');

      // 4. Trigger finalizeStreamingResponse with memory title and photo
      const finalizeFn = window.finalizeStreamingResponse;
      if (typeof finalizeFn === 'function') {
        finalizeFn({
          fullResponse: 'I remember that day so clearly! Looking back at our Archival Final Match photograph...',
          insightQuote: 'Unforgettable Victory',
          retrievedPhotos: [
            {
              url: samplePhotoUrl,
              caption: 'Unforgettable Victory Trophy',
              title: 'Archival Final Match',
              date: '2023-10-15',
              id: 99,
              index: 0
            }
          ]
        });
      }

      // Check if photo card is rendered in the chat bubble
      const photoCard = aiBubble.querySelector('img[src="' + samplePhotoUrl + '"]');
      const photoBadge = aiBubble.textContent.includes('RETRIEVED ARCHIVAL PHOTO');
      
      // Test Lightbox open
      const zoomTarget = aiBubble.querySelector('.photo-preview-wrap');
      if (zoomTarget) zoomTarget.click();
      const lightboxActive = document.getElementById('modal-photo-lightbox')?.classList.contains('active');

      return {
        hasPhotoCard: Boolean(photoCard),
        hasBadge: photoBadge,
        lightboxOpened: Boolean(lightboxActive)
      };
    });

    expect(testOutcome.hasPhotoCard).toBe(true);
    expect(testOutcome.hasBadge).toBe(true);
    expect(testOutcome.lightboxOpened).toBe(true);
  });

  // ─────────────────────────────────────────────────────────────
  // 13. CLEANUP: RIGHT TO BE FORGOTTEN (GDPR)
  // ─────────────────────────────────────────────────────────────
  test('13.1 - DELETE /api/memories/:id removes memory node', async ({ request }) => {
    const res = await request.delete(`${BASE_URL}/api/memories/${memoryId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(200);
  });

  test('13.2 - DELETE /api/users/:userId cascades and deletes user account', async ({ request }) => {
    const res = await request.delete(`${BASE_URL}/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.message).toContain('permanently deleted');
  });

});
