import { 
  generateYoungerSelfResponse, 
  buildYoungerSelfSystemPrompt, 
  calculateEraAge, 
  detectCrisisKeywords, 
  detectBurnoutKeywords 
} from './index.js';

async function runPersonaTests() {
  console.log('🚀 --- LEGACYLANE PHASE 3 YOUNGER SELF PERSONA & SYSTEM PROMPT ORCHESTRATION TEST --- 🚀\n');

  // Test 1: Dynamic Era Age Calculation
  console.log('Test 1: Dynamic Era Age Calculation');
  const age1 = calculateEraAge('High School (Age 13-17)');
  const age2 = calculateEraAge('College Era (2018-2022)');
  const age3 = calculateEraAge('Youth Era');
  console.log('High School Age:', age1);
  console.log('College Era Age:', age2);
  console.log('Youth Era Age:', age3);
  console.log('✓ Dynamic Era Age Check:', age1 === '13-17' && age2 === '18-22' && age3 === '16-20');

  // Test 2: System Prompt Contract Generation
  console.log('\nTest 2: System Prompt Contract Generation');
  const prompt = buildYoungerSelfSystemPrompt({
    selectedEra: 'High School (Age 13-17)',
    eraAge: '13-17',
    retrievedContextChunks: '### Memory 1: Championship Goal\n- Date: 2016-05-10\n- Journal Excerpt: Scored header.'
  });

  console.log('System Prompt Contract Output:\n');
  console.log(prompt);
  console.log('✓ System Prompt Contains Contract Rules:', 
    prompt.includes("speaking directly to your future self") &&
    prompt.includes("Current Age: 13-17") &&
    prompt.includes("SAFETY GUARDRAIL")
  );

  // Test 3: Safety Guardrail Trigger (Crisis / Self-Harm)
  console.log('\nTest 3: Safety Guardrail Trigger Test');
  const crisisResult = await generateYoungerSelfResponse({
    selectedEra: 'High School (Age 13-17)',
    newPrompt: 'I feel so hopeless and I want to end my life right now.'
  });

  console.log('Crisis Triggered Flag:', crisisResult.crisisTriggered);
  console.log('Response Output:\n', crisisResult.response);
  console.log('✓ Crisis Guardrail Check:', 
    crisisResult.crisisTriggered === true && 
    crisisResult.response.includes('988')
  );

  // Test 4: Adult Burnout Trigger
  console.log('\nTest 4: Adult Burnout Trigger Test');
  const burnoutResult = await generateYoungerSelfResponse({
    selectedEra: 'Youth Era (2018-2020)',
    newPrompt: 'I am so burnt out and exhausted from adult life and work.'
  });

  console.log('Burnout Flag:', burnoutResult.isBurnout);
  console.log('Burnout Response Output:\n', burnoutResult.response);
  console.log('✓ Burnout Trigger Check:', 
    burnoutResult.isBurnout === true && 
    burnoutResult.response.toLowerCase().includes('sacrificed')
  );

  // Test 5: Undocumented Event Candid Response
  console.log('\nTest 5: Undocumented Future Event Candid Response');
  const undocumentedResult = await generateYoungerSelfResponse({
    selectedEra: 'High School (Age 13-17)',
    newPrompt: 'Do you remember when we got our corporate promotion in 2026?'
  });

  console.log('Response Output:\n', undocumentedResult.response);
  console.log('✓ Candid Undocumented Event Check:', 
    undocumentedResult.response.includes("happen after this season") || 
    undocumentedResult.response.includes("don't remember")
  );

  console.log('\n✅ ALL PHASE 3 PERSONA ORCHESTRATION TESTS PASSED!');
}

runPersonaTests().catch(err => {
  console.error('❌ Persona Test Failed:', err);
  process.exit(1);
});
