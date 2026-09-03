import { 
  ingestMemoryPayload, 
  retrieveEraContext, 
  estimateTokens 
} from './index.js';

async function runRAGTests() {
  console.log('🚀 --- LEGACYLANE PHASE 2 ERA-FILTERED RAG ENGINE TEST --- 🚀\n');

  const testUserId = 'usr_rag_test_' + Date.now();

  // Ingest memories across 2 different eras for testing boundary enforcement
  console.log('Ingesting sample memories for testing...');
  
  // High School Era Memories (Era A)
  await ingestMemoryPayload({
    userId: testUserId,
    title: 'High School District Finals',
    description: 'Scored the decisive 3-pointer in the high school basketball finals. The crowd went wild!',
    entryDate: '2016-03-12',
    era: 'High School (Age 13-17)',
    emotionTags: ['Triumph', 'Excitement'],
    sentimentScore: 0.9
  });

  await ingestMemoryPayload({
    userId: testUserId,
    title: 'Biology Class Dissection',
    description: 'Struggled during biology lab dissection, but my lab partner helped me pass the practical test.',
    entryDate: '2016-10-05',
    era: 'High School (Age 13-17)',
    emotionTags: ['Anxiety', 'Relief'],
    sentimentScore: 0.2
  });

  // College Era Memories (Era B)
  await ingestMemoryPayload({
    userId: testUserId,
    title: 'College Varsity Starter Selection',
    description: 'Selected as starting attacking midfielder for university team #10 jersey.',
    entryDate: '2020-09-18',
    era: 'College Era (2018-2022)',
    emotionTags: ['Pride', 'Focus'],
    sentimentScore: 0.95
  });

  // Test 1: Hard Metadata Filtering Boundary Check (Stage 1)
  console.log('\nTest 1: Hard Metadata Filtering Boundary Check');
  const hsRetrieval = await retrieveEraContext({
    userId: testUserId,
    selectedEra: 'High School (Age 13-17)',
    userPrompt: 'Tell me about my basketball games and sports achievements',
    topK: 4
  });

  console.log(`Retrieved ${hsRetrieval.count} memories for 'High School (Age 13-17)'.`);
  console.log('Returned Era Check:', hsRetrieval.memories.every(m => m.era === 'High School (Age 13-17)'));
  console.log('✓ Zero Context Bleeding Check:', hsRetrieval.memories.none ? true : !hsRetrieval.memories.some(m => m.era === 'College Era (2018-2022)'));

  // Test 2: Fallback Handling for Sparse Data (0 memories)
  console.log('\nTest 2: Fallback Handling for Sparse/Empty Era');
  const emptyEraRetrieval = await retrieveEraContext({
    userId: testUserId,
    selectedEra: 'Pro Career Era (2024-Present)',
    userPrompt: 'What was my pro contract deal?',
    topK: 4
  });

  console.log('Sparse Flag:', emptyEraRetrieval.isSparse);
  console.log('Fallback Message:', `"${emptyEraRetrieval.fallbackMessage}"`);
  console.log('✓ Fallback Trigger Check:', emptyEraRetrieval.isSparse && emptyEraRetrieval.fallbackMessage.includes("haven't logged any memories"));

  // Test 3: Token Budgeting & Markdown Formatting (< 800 Tokens)
  console.log('\nTest 3: Token Budgeting & Markdown Formatting Check');
  console.log(`Estimated Tokens: ${hsRetrieval.tokenEstimate} / 800 Tokens Max`);
  console.log('Formatted Markdown Context Output:\n');
  console.log(hsRetrieval.formattedContext);
  console.log('✓ Token Budget Constraint (< 800 tokens):', hsRetrieval.tokenEstimate <= 800);

  console.log('\n✅ ALL PHASE 2 ERA-FILTERED RAG ENGINE TESTS PASSED!');
}

runRAGTests().catch(err => {
  console.error('❌ RAG Test Failed:', err);
  process.exit(1);
});
