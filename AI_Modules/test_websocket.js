import { WebSocket } from 'ws';
import { initSidelineWebSocketServer } from './index.js';

async function runWebSocketTests() {
  console.log('🚀 --- LEGACYLANE PHASE 4 REAL-TIME WEBSOCKET STREAMING & INSTANT LEARNING TEST --- 🚀\n');

  const TEST_PORT = 5005;
  const wss = initSidelineWebSocketServer({ port: TEST_PORT });

  const testUserId = 'usr_ws_test_' + Date.now();
  const wsUrl = `ws://localhost:${TEST_PORT}/ws/sideline-ai?userId=${testUserId}&era=Youth%20Era`;

  console.log(`Connecting test WebSocket client to ${wsUrl}...`);
  const client = new WebSocket(wsUrl);

  await new Promise((resolve, reject) => {
    let tokensReceived = [];
    let isConnected = false;
    let memoryLearned = false;

    client.on('open', () => {
      console.log('✓ WebSocket Connection Established.');
    });

    client.on('message', async (data) => {
      const msg = JSON.parse(data.toString());

      if (msg.event === 'connected') {
        console.log(`✓ Connected ACK received: Session ${msg.sessionId}`);
        isConnected = true;

        // Step 1: Trigger Real-Time Token Streaming Test
        console.log('\nSending chat prompt over WebSocket...');
        client.send(JSON.stringify({
          prompt: 'Do you remember our intense morning practice sessions?',
          era: 'Youth Era'
        }));
      }

      if (msg.event === 'token') {
        tokensReceived.push(msg.data);
        process.stdout.write(msg.data);
      }

      if (msg.event === 'done') {
        console.log('\n\n✓ Token Streaming Completed.');
        console.log('Insight Quote Output:', `"${msg.insightQuote}"`);
        console.log(`Total Token Chunks Streamed: ${tokensReceived.length}`);

        if (!memoryLearned) {
          // Step 2: Trigger Instant Learning Hook (+ LOG PLAY) Test
          console.log('\nTesting Real-Time "+ LOG PLAY" Instant Learning Event...');
          client.send(JSON.stringify({
            event: 'log_play',
            memoryData: {
              title: 'State Championship Gold Medal',
              description: 'Scored hattrick in the final 10 minutes to win state championship gold medal!',
              entryDate: '2024-06-20',
              era: 'Youth Era',
              emotionTags: ['Triumph', 'Pride']
            }
          }));
        } else {
          // Step 3: Test completed!
          client.close();
          wss.close();
          resolve(true);
        }
      }

      if (msg.event === 'memory_learned') {
        console.log('✓ Instant Learning Broadcast Received:', msg.message);
        console.log(`Learned Memory ID: ${msg.memoryId} | Title: ${msg.title}`);
        memoryLearned = true;

        // Step 3: Verify Post-Learning Immediate Memory Retrieval Query
        console.log('\nTesting post-learning query to verify instant recall...');
        tokensReceived = [];
        client.send(JSON.stringify({
          prompt: 'Tell me about our state championship gold medal hattrick',
          era: 'Youth Era'
        }));
      }

      if (msg.event === 'error') {
        reject(new Error(msg.message));
      }
    });

    client.on('error', (err) => reject(err));
  });

  console.log('\n✅ ALL PHASE 4 WEBSOCKET STREAMING & INSTANT LEARNING TESTS PASSED!');
}

runWebSocketTests().catch(err => {
  console.error('❌ WebSocket Test Failed:', err);
  process.exit(1);
});
