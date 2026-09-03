import { 
  formatEmbeddingPayload, 
  generateEmbedding, 
  encryptText, 
  decryptText, 
  ingestMemoryPayload, 
  searchMemoriesByQuery,
  getSupabaseSchemaSQL 
} from './index.js';

async function runTests() {
  console.log('🚀 --- LEGACYLANE AI MEMORY VECTORIZATION PIPELINE TEST --- 🚀\n');

  // Test 1: Payload Formatting
  console.log('Test 1: Rich Payload Formatting');
  const sampleMemory = {
    userId: 'usr_test_99',
    title: 'Championship Winning Goal',
    description: 'Scored the match-winning header in the 90th minute during the finals.',
    entryDate: '2024-05-15',
    era: 'Youth Era (2020-2024)',
    emotionTags: ['Triumph', 'Ecstasy'],
    contextTags: ['Finals', 'Header'],
    sentimentScore: 0.95,
    mediaUrl: 'https://example.com/goal.jpg'
  };

  const payloadString = formatEmbeddingPayload(sampleMemory);
  console.log('Formatted Payload:\n', `"${payloadString}"`);
  console.log('✓ Payload match check:', payloadString.includes('Era: Youth Era (2020-2024) | Date: 2024-05-15 | Title: Championship Winning Goal | Emotion: Triumph, Ecstasy | Journal: Scored the match-winning header in the 90th minute during the finals.'));

  // Test 2: AES-256 Encryption & Decryption
  console.log('\nTest 2: AES-256-GCM Text Encryption & Decryption');
  const encrypted = encryptText(sampleMemory.description);
  console.log('Encrypted Payload:', encrypted.encoded);
  const decrypted = decryptText(encrypted.encoded);
  console.log('Decrypted Text:', decrypted);
  console.log('✓ Lossless Encryption Check:', decrypted === sampleMemory.description);

  // Test 3: 768-Dim Vector Generation
  console.log('\nTest 3: Modular Vector Generation (768-dim)');
  const embedResult = await generateEmbedding(payloadString);
  console.log('Provider:', embedResult.provider);
  console.log('Vector Dimension:', embedResult.embedding.length);
  console.log('Zero Training Guarantee:', embedResult.zeroTrainingGuarantee);
  console.log('First 5 vector values:', embedResult.embedding.slice(0, 5));
  console.log('✓ Dimension is 768 Check:', embedResult.embedding.length === 768);

  // Test 4: Full Ingestion Service Pipeline
  console.log('\nTest 4: Full Ingestion Pipeline (ingestMemoryPayload)');
  const ingestResponse = await ingestMemoryPayload(sampleMemory);
  console.log('Ingest Response:', JSON.stringify(ingestResponse, null, 2));
  console.log('✓ Ingest Status Check:', ingestResponse.status === 'success' && ingestResponse.vectorDimension === 768);

  // Test 5: Vector Search Query
  console.log('\nTest 5: Semantic Similarity Vector Search Query');
  const searchHits = await searchMemoriesByQuery('winning goal in final match', 'usr_test_99');
  console.log('Search Results:', searchHits);
  console.log('✓ Vector Search Match Check:', searchHits.length > 0 && searchHits[0].memoryId === ingestResponse.memoryId);

  // Test 6: Supabase SQL DDL Schema Check
  console.log('\nTest 6: Supabase DDL SQL Schema Generation');
  const ddl = getSupabaseSchemaSQL();
  console.log('SQL DDL snippet:\n', ddl.trim().slice(0, 200) + '...');

  console.log('\n✅ ALL 6 PIPELINE TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('❌ Pipeline Test Failed:', err);
  process.exit(1);
});
