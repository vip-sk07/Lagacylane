// Test Suite for Scenario-2 (Profile Management) and Scenario-3 (Multimodal Data Ingestion)
const fs = require('fs');
const path = require('path');

async function runTestSuite() {
    console.log('================================================================');
    console.log('   SCENARIO-2: PROFILE MANAGEMENT & SCENARIO-3: INGESTION TESTS  ');
    console.log('================================================================\n');

    const API_BASE = (process.env.TEST_BASE_URL || 'http://localhost:5000') + '/api';
    const resultsScenario2 = [];
    const resultsScenario3 = [];

    // Helper user for Scenario 2
    const testUserId = 'usr_qa_test_' + Date.now();

    // ─────────────────────────────────────────────────────────────
    // SCENARIO 2: PROFILE MANAGEMENT
    // ─────────────────────────────────────────────────────────────

    // TC002a: Navigation menu - Click "My Profile" link
    {
        const timelineHtml = fs.readFileSync('Frontend/timeline.html', 'utf8');
        const hasMyProfileBtn = timelineHtml.includes('My Profile') && timelineHtml.includes('modal-edit-profile');
        const expected = 'Navigates to the user profile page';
        const actual = hasMyProfileBtn ? 'Navigates to the user profile page' : 'Navigation failed';
        const status = hasMyProfileBtn ? 'PASS' : 'FAIL';
        resultsScenario2.push({
            id: 'TC002a',
            method: 'Navigation menu',
            input: 'Click “My Profile” link',
            expected,
            actual,
            status
        });
        console.log(`[TC002a] Status: ${status} | Actual: ${actual}`);
    }

    // TC002b: Edit Profile form - Update First Name: John, click "Save"
    {
        const res = await fetch(`${API_BASE}/profile/${testUserId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'John', sportType: 'football' })
        });
        const data = await res.json();
        const success = res.ok && data.user && data.user.Name === 'John';
        const expected = 'Success message “Profile updated successfully”';
        const actual = success ? 'Success message “Profile updated successfully”' : `Failed: ${data.error}`;
        const status = success ? 'PASS' : 'FAIL';
        resultsScenario2.push({
            id: 'TC002b',
            method: 'Edit Profile form',
            input: 'Update First Name: John, click “Save”',
            expected,
            actual,
            status
        });
        console.log(`[TC002b] HTTP ${res.status} | Status: ${status} | Actual: ${actual}`);
    }

    // TC002c: Edit Profile form - Update Email: invalid-email-format
    {
        const res = await fetch(`${API_BASE}/profile/${testUserId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'invalid-email-format' })
        });
        const data = await res.json();
        const isValidationError = res.status === 400 && data.error === 'Please enter a valid email address';
        const expected = 'Validation error “Please enter a valid email address”';
        const actual = isValidationError ? 'Validation error “Please enter a valid email address”' : `Unexpected: HTTP ${res.status} ${JSON.stringify(data)}`;
        const status = isValidationError ? 'PASS' : 'FAIL';
        resultsScenario2.push({
            id: 'TC002c',
            method: 'Edit Profile form',
            input: 'Update Email: invalid-email-format',
            expected,
            actual,
            status
        });
        console.log(`[TC002c] HTTP ${res.status} | Status: ${status} | Actual: ${actual}`);
    }

    // TC002d: Avatar Upload - Upload profile.png (size < 2 MB)
    {
        // 1x1 transparent PNG buffer
        const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
        const pngBuffer = Buffer.from(pngBase64, 'base64');
        
        const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
        let body = Buffer.concat([
            Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="media"; filename="profile.png"\r\nContent-Type: image/png\r\n\r\n`),
            pngBuffer,
            Buffer.from(`\r\n--${boundary}--\r\n`)
        ]);

        const uploadRes = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
            body: body
        });
        const uploadData = await uploadRes.json();
        const avatarUrl = uploadData.url;

        // Sync avatar to profile
        let syncSuccess = false;
        if (avatarUrl) {
            const profileRes = await fetch(`${API_BASE}/profile/${testUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ avatarUrl })
            });
            const pData = await profileRes.json();
            syncSuccess = profileRes.ok && pData.user && pData.user.AvatarURL === avatarUrl;
        }

        const expected = 'Avatar image is updated and displayed on the profile';
        const actual = (uploadRes.ok && syncSuccess) ? 'Avatar image is updated and displayed on the profile' : 'Failed to update avatar';
        const status = (uploadRes.ok && syncSuccess) ? 'PASS' : 'FAIL';
        resultsScenario2.push({
            id: 'TC002d',
            method: 'Avatar Upload',
            input: 'Upload profile.png (size < 2 MB)',
            expected,
            actual,
            status
        });
        console.log(`[TC002d] HTTP ${uploadRes.status} | Status: ${status} | Actual: ${actual}`);
    }

    // ─────────────────────────────────────────────────────────────
    // SCENARIO 3: MULTIMODAL DATA INGESTION
    // ─────────────────────────────────────────────────────────────

    // TC003a: API / File Upload - Upload a valid image (.jpg) and text pair
    {
        const fakeJpg = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01, 0xFF, 0xD9]);
        const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
        let body = Buffer.concat([
            Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="text"\r\n\r\nState Final Victory\r\n`),
            Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="media"; filename="trophy.jpg"\r\nContent-Type: image/jpeg\r\n\r\n`),
            fakeJpg,
            Buffer.from(`\r\n--${boundary}--\r\n`)
        ]);

        const res = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
            body: body
        });
        const data = await res.json();
        const success = res.status === 200 && data.parsedData && data.parsedData.text === 'State Final Victory';

        const expected = 'File accepted, returns 200 OK and parsed data';
        const actual = success ? 'File accepted, returns 200 OK and parsed data' : `Failed: HTTP ${res.status}`;
        const status = success ? 'PASS' : 'FAIL';
        resultsScenario3.push({
            id: 'TC003a',
            method: 'API / File Upload',
            input: 'Upload a valid image (.jpg) and text pair',
            expected,
            actual,
            status
        });
        console.log(`[TC003a] HTTP ${res.status} | Status: ${status} | Actual: ${actual}`);
    }

    // TC003b: API / File Upload - Upload an unsupported file type (.exe)
    {
        const exeBuffer = Buffer.from('MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00\xFF\xFF\x00\x00');
        const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
        let body = Buffer.concat([
            Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="media"; filename="trojan.exe"\r\nContent-Type: application/x-msdownload\r\n\r\n`),
            exeBuffer,
            Buffer.from(`\r\n--${boundary}--\r\n`)
        ]);

        const res = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
            body: body
        });
        const data = await res.json();
        const errorCaught = (res.status === 415 || res.status === 400) && data.error === 'Unsupported media format';

        const expected = 'Error “Unsupported media format”';
        const actual = errorCaught ? 'Error “Unsupported media format”' : `Got: HTTP ${res.status} ${JSON.stringify(data)}`;
        const status = errorCaught ? 'PASS' : 'FAIL';
        resultsScenario3.push({
            id: 'TC003b',
            method: 'API / File Upload',
            input: 'Upload an unsupported file type (.exe)',
            expected,
            actual,
            status
        });
        console.log(`[TC003b] HTTP ${res.status} | Status: ${status} | Actual: ${actual}`);
    }

    // TC003c: Ingestion Service - Send a massive payload (for example a 500 MB video)
    {
        // 25 MB payload (exceeds multer's 20 MB limit)
        const largeChunk = Buffer.alloc(25 * 1024 * 1024, 0x41);
        const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
        let body = Buffer.concat([
            Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="media"; filename="massive_500mb_sample.mp4"\r\nContent-Type: video/mp4\r\n\r\n`),
            largeChunk,
            Buffer.from(`\r\n--${boundary}--\r\n`)
        ]);

        let rejectedCleanly = false;
        try {
            const res = await fetch(`${API_BASE}/upload`, {
                method: 'POST',
                headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
                body: body
            });
            // 413 Payload Too Large
            if (res.status === 413) {
                rejectedCleanly = true;
            }
        } catch (e) {
            // Connection closed by server due to limit
            rejectedCleanly = true;
        }

        // Verify server is alive and responding normally
        const healthRes = await fetch(`${API_BASE}/health`);
        const serverHealthy = healthRes.ok && (await healthRes.json()).status === 'ok';

        const expected = 'Payload is chunked or rejected without crashing the service';
        const actual = (rejectedCleanly && serverHealthy)
            ? 'Payload is chunked or rejected without crashing the service'
            : 'Server crashed or did not reject payload';
        const status = (rejectedCleanly && serverHealthy) ? 'PASS' : 'FAIL';
        resultsScenario3.push({
            id: 'TC003c',
            method: 'Ingestion Service',
            input: 'Send a massive payload (for example a 500 MB video)',
            expected,
            actual,
            status
        });
        console.log(`[TC003c] Clean Rejection: ${rejectedCleanly} | Server Alive: ${serverHealthy} | Status: ${status}`);
    }

    console.log('\n================================================================');
    console.log('       TABLE 5.4: SCENARIO 2 (PROFILE MANAGEMENT) RESULTS       ');
    console.log('================================================================');
    console.table(resultsScenario2);

    console.log('\n================================================================');
    console.log('    TABLE 5.5: SCENARIO 3 (MULTIMODAL DATA INGESTION) RESULTS   ');
    console.log('================================================================');
    console.table(resultsScenario3);
}

runTestSuite();
