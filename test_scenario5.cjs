const WS = globalThis.WebSocket;
const http = require('http');

// Scenario-5: the cases recorded as FAIL in the report (Table 5.2 TC-13, Table 5.5 TC003c, Table 5.7 TC004e)
async function runScenario5Tests() {
    console.log('================================================================');
    console.log('        SCENARIO-5: PREVIOUSLY FAILED CASES (REGRESSION)        ');
    console.log('================================================================\n');

    const BASE = process.env.TEST_BASE_URL || 'http://localhost:5000';
    const WS_URL = BASE.replace(/^http/, 'ws') + '/ws/sideline-ai';
    const API_BASE = BASE + '/api';
    const results = [];
    const record = (id, method, input, expected, actual, pass) => {
        const status = pass ? 'PASS' : 'FAIL';
        results.push({ id, method, input, expected, actual, status });
        console.log(`[${id}] Status: ${status} | Actual: ${actual}`);
    };

    // ─────────────────────────────────────────────────────────────
    // TC004e: Chat drawer (WebSocket) — rapid consecutive prompts (< 500ms)
    // Expected: Status "RATE LIMITED"; prompt queued gracefully (socket stays open, every prompt answered in order)
    // ─────────────────────────────────────────────────────────────
    {
        const userId = 'usr_qa_rapid_' + Date.now();
        const era = 'Championship & Breakthrough';
        const prompts = ['Remind me of my dream', 'How did the finals feel?', 'What kept us going?'];
        let rateLimitedEvents = 0;
        let doneEvents = 0;
        let closeCode = null;
        let interleaved = false;
        let streaming = false;

        await new Promise((resolve) => {
            const ws = new WS(`${WS_URL}?userId=${userId}&era=${encodeURIComponent(era)}`);
            const timeout = setTimeout(() => { try { ws.close(); } catch (e) {} resolve(); }, 90000);

            ws.onopen = () => {
                prompts.forEach((p, i) => setTimeout(() => ws.send(JSON.stringify({ prompt: p, era })), i * 100));
            };
            ws.onmessage = (event) => {
                const msg = JSON.parse(event.data.toString());
                if (msg.event === 'rate_limited') rateLimitedEvents++;
                if (msg.event === 'token') {
                    if (!streaming && doneEvents > 0 && doneEvents >= prompts.length) interleaved = true;
                    streaming = true;
                }
                if (msg.event === 'done') {
                    streaming = false;
                    doneEvents++;
                    if (doneEvents === prompts.length) {
                        clearTimeout(timeout);
                        ws.close(1000);
                    }
                }
            };
            ws.onclose = (ev) => { closeCode = ev.code; clearTimeout(timeout); resolve(); };
            ws.onerror = () => {};
        });

        const pass = rateLimitedEvents >= 1 && doneEvents === prompts.length && !interleaved && closeCode === 1000;
        record('TC004e', 'Chat drawer (WebSocket)', 'Send rapid consecutive prompts (< 500ms)',
            'Status "RATE LIMITED"; prompt queued gracefully',
            `rate_limited events: ${rateLimitedEvents}, replies: ${doneEvents}/${prompts.length}, close code: ${closeCode}`, pass);
    }

    // ─────────────────────────────────────────────────────────────
    // TC003c: Ingestion Service — stream a 500 MB video upload
    // Expected: Payload is rejected without crashing the service
    // ─────────────────────────────────────────────────────────────
    {
        const declaredSize = 500 * 1024 * 1024;
        const boundary = '----LegacyLaneBoundary' + Date.now();
        const head = Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="media"; filename="massive_500mb.mp4"\r\nContent-Type: video/mp4\r\n\r\n`);
        const tail = Buffer.from(`\r\n--${boundary}--\r\n`);
        const url = new URL(`${API_BASE}/upload`);

        const outcome = await new Promise((resolve) => {
            const req = http.request({
                hostname: url.hostname,
                port: url.port,
                path: url.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${boundary}`,
                    'Content-Length': head.length + declaredSize + tail.length
                }
            }, (res) => {
                let body = '';
                res.on('data', (c) => { body += c; });
                res.on('end', () => { req.destroy(); resolve({ status: res.statusCode, body }); });
            });
            req.on('error', (err) => resolve({ status: null, error: err.code }));
            req.write(head);
            // Stream a few MB of the "video" — the server must answer without waiting for all 500 MB
            const chunk = Buffer.alloc(1024 * 1024, 0x41);
            let sent = 0;
            const pump = () => {
                while (sent < 8 && req.write(chunk)) sent++;
                if (sent < 8) req.once('drain', () => { sent++; pump(); });
            };
            pump();
        });

        const health = await fetch(`${API_BASE}/health`).then(r => r.json()).catch(() => null);
        const pass = outcome.status === 413 && health && health.status === 'ok';
        record('TC003c', 'Ingestion Service', 'Send a massive payload (500 MB video)',
            'Payload is chunked or rejected without crashing the service',
            `HTTP ${outcome.status || outcome.error} | server alive: ${Boolean(health && health.status === 'ok')}`, pass);
    }

    // ─────────────────────────────────────────────────────────────
    // TC-13: Data Export with the token issued at sign-in (no test bypass header)
    // Also checks that a streamed WebSocket chat is persisted into the exported chat history
    // ─────────────────────────────────────────────────────────────
    {
        const email = `export.${Date.now()}@legacylane.internal`;
        const reg = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Export Tester', email, password: 'password123' })
        }).then(r => r.json());
        const userId = reg.user && reg.user.id;
        const token = reg.token;

        await fetch(`${API_BASE}/memories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, title: 'Export Finals Night', date: '2023-06-01', journal: 'We lifted the cup under the lights.', era: 'Championship & Breakthrough' })
        });

        await new Promise((resolve) => {
            const ws = new WS(`${WS_URL}?userId=${encodeURIComponent(userId)}&era=${encodeURIComponent('Championship & Breakthrough')}`);
            const timeout = setTimeout(() => { try { ws.close(); } catch (e) {} resolve(); }, 60000);
            ws.onopen = () => ws.send(JSON.stringify({ prompt: 'Remind me of the finals night', era: 'Championship & Breakthrough' }));
            ws.onmessage = (event) => {
                const msg = JSON.parse(event.data.toString());
                if (msg.event === 'done') { clearTimeout(timeout); setTimeout(() => { ws.close(); resolve(); }, 300); }
            };
            ws.onerror = () => {};
        });

        const res = await fetch(`${API_BASE}/users/${encodeURIComponent(userId)}/export`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        const memory = (data.timelineMemories || [])[0];
        const pass = res.ok && Boolean(data.user) && memory && memory.Journal === 'We lifted the cup under the lights.' &&
            Array.isArray(data.aiChatHistory) && data.aiChatHistory.length >= 1;
        record('TC-13', 'Data Export', 'Click Export my data (signed-in token)',
            'JSON file with profile, memories and chat history',
            `HTTP ${res.status} | memories: ${(data.timelineMemories || []).length} | chat sessions: ${(data.aiChatHistory || []).length}`, pass);

        await fetch(`${API_BASE}/users/${encodeURIComponent(userId)}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    }

    console.log('\n================================================================');
    console.log('        TABLE 5.7: SCENARIO 5 (PREVIOUSLY FAILED) RESULTS        ');
    console.log('================================================================');
    console.table(results);

    const failed = results.filter(r => r.status !== 'PASS').length;
    console.log(`\nOverall Result: ${results.length - failed} / ${results.length} PASSED`);
    process.exit(failed ? 1 : 0);
}

runScenario5Tests().catch(err => {
    console.error('Scenario 5 Error:', err);
    process.exit(1);
});
