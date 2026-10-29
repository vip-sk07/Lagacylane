import 'dotenv/config';
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:5000';
import { 
  generateEmbedding,
  ingestMemoryPayload,
  retrieveEraContext,
  generateYoungerSelfResponse,
  buildYoungerSelfSystemPrompt,
  detectCrisisKeywords,
  detectBurnoutKeywords,
  calculateEraAge,
  synthesizeLearnedInsights
} from './index.js';

async function testAll() {
  console.log('=== 1. TESTING EMBEDDINGS ===');
  try {
    const emb = await generateEmbedding('First rainy morning practice soccer drill');
    console.log('Embedding generated! Provider:', emb.provider, 'Dimension:', emb.embedding?.length);
  } catch (e) {
    console.error('Embedding FAILED:', e.message);
  }

  console.log('\n=== 2. TESTING NODE INGESTION & RAG RETRIEVAL ===');
  const userId = 'eval_usr_' + Date.now();
  const eraA = 'Youth & Formative Years';
  const eraB = 'Varsity Era';

  try {
    console.log('Ingesting Node 1 in Era A...');
    await ingestMemoryPayload({
      userId,
      title: 'First Rainy Morning Practice',
      description: 'Freezing rain at 5am. Mud on cleats. Coach told us to keep running.',
      entryDate: '2022-03-01',
      era: eraA,
      emotionTags: ['Grit', 'Exhaustion'],
      sentimentScore: 0.4
    });

    console.log('Ingesting Node 2 in Era B...');
    await ingestMemoryPayload({
      userId,
      title: 'Regional Championship Clutch Winner',
      description: 'Scored buzzer beater goal. Whole team carried me off the pitch.',
      entryDate: '2024-05-15',
      era: eraB,
      emotionTags: ['Triumph', 'Ecstasy'],
      sentimentScore: 0.98
    });

    console.log('Querying RAG for Era A...');
    const ragA = await retrieveEraContext({
      userId,
      selectedEra: eraA,
      userPrompt: 'Tell me about our hardest rainy practices',
      topK: 4
    });
    console.log('RAG Era A returned count:', ragA.count);
    console.log('RAG Era A returned memory title:', ragA.memories[0]?.title);
    console.log('Zero Bleeding check (no Era B in Era A):', !ragA.memories.some(m => m.era === eraB));

    console.log('\nQuerying RAG for non-existent Era C...');
    const ragC = await retrieveEraContext({
      userId,
      selectedEra: 'Pro Era',
      userPrompt: 'Contract signing',
      topK: 4
    });
    console.log('Sparse Era C flag:', ragC.isSparse);
    console.log('Sparse message:', ragC.fallbackMessage);

  } catch (e) {
    console.error('Ingest/RAG FAILED:', e.message);
  }

  console.log('\n=== 3. TESTING YOUNGER SELF WITH TIMELINE NODES ===');
  const timelineNodes = [
    {
      id: 1,
      title: 'First Rainy Morning Practice',
      date: '2022-03-01',
      era: eraA,
      journal: 'Freezing rain at 5am. Mud on cleats. Coach told us to keep running.',
      sentiment: 40,
      tags: ['Grit', 'Exhaustion'],
      photos: [{ url: '/uploads/rainy.jpg', caption: 'Lacing muddy cleats under floodlights' }]
    },
    {
      id: 2,
      title: 'State Cup Quarterfinals',
      date: '2023-11-10',
      era: eraA,
      journal: 'Down 0-1, delivered crucial assist in the 88th minute to force penalties.',
      sentiment: 88,
      tags: ['Focus', 'Teamwork'],
      photos: [{ url: '/uploads/assist.jpg', caption: 'Sliding through the rain to deliver the pass' }]
    }
  ];

  try {
    console.log('Calling generateYoungerSelfResponse with timeline nodes...');
    const res = await generateYoungerSelfResponse({
      userId,
      selectedEra: eraA,
      newPrompt: 'I feel exhausted from training today. Do you remember when we wanted to give up?',
      rawMemories: timelineNodes,
      journeyType: 'sports',
      domain: 'football'
    });

    console.log('Younger self responded successfully!');
    console.log('Model used:', res.model);
    console.log('Learned memories count:', res.learnedMemoriesCount);
    console.log('Burnout detected:', res.isBurnout);
    console.log('Younger Self Response excerpt:\n', typeof res === 'object' ? res.response?.slice(0, 300) : String(res).slice(0, 300));
  } catch (e) {
    console.error('Younger Self generation FAILED:', e.message);
  }

  console.log('\n=== 4. TESTING REST /api/chat ENDPOINT OF RUNNING BACKEND SERVER ===');
  try {
    const chatRes = await fetch(BASE_URL + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        era: eraA,
        journeyType: 'sports',
        domain: 'football',
        userMessage: 'What advice do you have for me based on our early practices?',
        clientMemories: timelineNodes
      })
    });

    if (chatRes.ok) {
      const data = await chatRes.json();
      console.log('Backend /api/chat SUCCESS!');
      console.log('Response excerpt:\n', (data.response || '').slice(0, 250));
    } else {
      console.error('Backend /api/chat returned status:', chatRes.status, await chatRes.text());
    }
  } catch (e) {
    console.error('REST /api/chat FAILED:', e.message);
  }

  console.log('\n=== 5. TESTING WEBSOCKET /ws/sideline-ai STREAMING ===');
  try {
    const WebSocket = (await import('ws')).default;
    const ws = new WebSocket(`${BASE_URL.replace(/^http/, 'ws')}/ws/sideline-ai?userId=${userId}&era=${encodeURIComponent(eraA)}`);

    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        ws.close();
        reject(new Error('WebSocket connection timed out'));
      }, 25000);

      let tokenCount = 0;
      let fullTokens = '';

      ws.on('open', () => {
        console.log('WebSocket connected! Sending prompt with client timeline nodes...');
        ws.send(JSON.stringify({
          prompt: 'Hey, how did you feel about our coach back then on those rainy mornings?',
          era: eraA,
          journeyType: 'sports',
          domain: 'football',
          clientMemories: timelineNodes
        }));
      });

      ws.on('message', (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.event === 'connected') {
          console.log('WS event: connected');
        } else if (msg.event === 'token') {
          tokenCount++;
          fullTokens += msg.data;
        } else if (msg.event === 'done') {
          console.log(`WS event: done! Received ${tokenCount} streamed tokens.`);
          console.log('Streamed text excerpt:\n', fullTokens.slice(0, 200));
          clearTimeout(timer);
          ws.close();
          resolve();
        } else if (msg.event === 'error') {
          console.error('WS event error:', msg.message);
          clearTimeout(timer);
          ws.close();
          reject(new Error(msg.message));
        }
      });

      ws.on('error', (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });
  } catch (e) {
    console.error('WebSocket test FAILED:', e.message);
  }

  console.log('\n=== 6. TESTING /api/memories INGESTION FLOW ===');
  try {
    const memRes = await fetch(BASE_URL + '/api/memories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        title: 'Midseason Conditioning Test',
        journal: 'Ran the beep test until everyone dropped. Finished last 3 levels on pure willpower.',
        date: '2022-08-20',
        era: eraA,
        tags: ['Grit', 'Conditioning'],
        sentiment: 85,
        journeyType: 'sports',
        domain: 'football'
      })
    });

    if (memRes.ok) {
      const savedMem = await memRes.json();
      console.log('POST /api/memories SUCCESS! Memory ID:', savedMem.memoryId || savedMem.id);
    } else {
      console.error('POST /api/memories returned status:', memRes.status, await memRes.text());
    }
  } catch (e) {
    console.error('POST /api/memories FAILED:', e.message);
  }

  console.log('\n=== ALL EVALUATION TESTS COMPLETED ===');
  process.exit(0);
}

testAll();
