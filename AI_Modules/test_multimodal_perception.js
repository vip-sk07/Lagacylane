import { 
  perceiveImage, 
  normalizeImageSource, 
  fuseMultimodalContext, 
  extractVisualKeywords, 
  cognitiveVisionHeuristic 
} from './index.js';

async function runMultimodalPerceptionTests() {
  console.log('🚀 --- LEGACYLANE MULTIMODAL PERCEPTION TEST SUITE --- 🚀\n');

  // Test 1: Image Source Normalization (Buffer & Base64 Data URL)
  console.log('Test 1: Image Source Normalization');
  const dummyBuffer = Buffer.from('simulated image byte stream');
  const normalizedBuffer = await normalizeImageSource(dummyBuffer, 'image/jpeg');
  const dummyDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  const normalizedDataUrl = await normalizeImageSource(dummyDataUrl);

  console.log('Normalized Buffer isBase64:', Boolean(normalizedBuffer.base64Data));
  console.log('Normalized Data URL mimeType:', normalizedDataUrl.mimeType);
  const test1Passed = Boolean(normalizedBuffer.base64Data) && normalizedDataUrl.mimeType === 'image/png';
  console.log('✓ Normalization Check:', test1Passed);
  if (!test1Passed) throw new Error('Test 1 failed');

  // Test 2: Cognitive Vision Heuristic & Scene Feature Extraction
  console.log('\nTest 2: Cognitive Vision Heuristic & Feature Extraction (Football)');
  const perceptionFootball = cognitiveVisionHeuristic({
    title: 'State Championship Final Header',
    description: 'Raining on the pitch under floodlights, scored the header in 89th minute wearing #10 jersey.',
    caption: 'Mud on our boots, trophy in our hands.',
    domain: 'football',
    era: 'Youth Era (2018-2020)'
  });

  console.log('Perceived Emotions:', perceptionFootball.perceivedEmotions);
  console.log('Visual Summary:', perceptionFootball.visualSummary);
  console.log('Tactical Elements:', perceptionFootball.tacticalElements);
  console.log('Confidence Score:', perceptionFootball.confidenceScore);

  const test2Passed = (
    perceptionFootball.perceivedEmotions.includes('Triumphant') &&
    perceptionFootball.sceneContext.lighting.includes('Floodlight') &&
    perceptionFootball.tacticalElements.some(t => t.includes('scoring') || t.includes('match'))
  );
  console.log('✓ Football Feature Extraction Check:', test2Passed);
  if (!test2Passed) throw new Error('Test 2 failed');

  // Test 3: Multimodal Context Fusion
  console.log('\nTest 3: Multimodal Context Fusion');
  const baseText = 'Era: Youth Era | Date: 2019-10-12 | Title: State Championship Final';
  const fusedContext = fuseMultimodalContext({
    textPayload: baseText,
    visualPerception: perceptionFootball,
    domain: 'football',
    era: 'Youth Era'
  });

  console.log('Fused Context Snippet:\n', fusedContext);
  const test3Passed = (
    fusedContext.includes('Visual Perception:') &&
    fusedContext.includes('Visual Emotions:') &&
    fusedContext.includes('Scene Environment:')
  );
  console.log('✓ Multimodal Fusion Check:', test3Passed);
  if (!test3Passed) throw new Error('Test 3 failed');

  // Test 4: Visual Keywords Extraction
  console.log('\nTest 4: Visual Keywords Extraction');
  const keywords = extractVisualKeywords(perceptionFootball);
  console.log('Extracted Keywords:', keywords);
  const test4Passed = keywords.length > 3 && keywords.includes('football');
  console.log('✓ Visual Keywords Check:', test4Passed);
  if (!test4Passed) throw new Error('Test 4 failed');

  // Test 5: End-to-End perceiveImage Pipeline (with fallback/Gemini)
  console.log('\nTest 5: End-to-End perceiveImage with Data URL');
  const e2eResult = await perceiveImage({
    imageSource: dummyDataUrl,
    title: 'First Half Volley',
    description: 'Clean strike into top corner.',
    domain: 'football',
    era: 'Youth Era'
  });

  console.log('E2E Provider:', e2eResult.provider);
  console.log('E2E Visual Summary:', e2eResult.visualSummary);
  const test5Passed = Boolean(e2eResult.visualSummary) && Array.isArray(e2eResult.perceivedEmotions);
  console.log('✓ E2E Perception Check:', test5Passed);
  if (!test5Passed) throw new Error('Test 5 failed');

  console.log('\n✅ ALL MULTIMODAL PERCEPTION TESTS PASSED!');
}

runMultimodalPerceptionTests().catch(err => {
  console.error('❌ Multimodal Perception Test Failed:', err);
  process.exit(1);
});
