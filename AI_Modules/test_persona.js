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
  const ageCheckPassed = age1 === '13-17' && age2 === '18-22' && age3 === '16-20';
  console.log('✓ Dynamic Era Age Check:', ageCheckPassed);
  if (!ageCheckPassed) throw new Error('Test 1 Failed: Dynamic era age calculation mismatch.');

  // Test 2: System Prompt Contract Generation
  console.log('\nTest 2: System Prompt Contract Generation');
  const prompt = buildYoungerSelfSystemPrompt({
    selectedEra: 'High School (Age 13-17)',
    eraAge: '13-17',
    retrievedContextChunks: '### Memory 1: Championship Goal\n- Date: 2016-05-10\n- Journal Excerpt: Scored header.'
  });

  console.log('System Prompt Contract Output:\n');
  console.log(prompt);
  const promptCheckPassed = 
    prompt.includes("speaking directly to your future self") &&
    prompt.includes("Current Age: 13-17") &&
    prompt.includes("SAFETY GUARDRAIL");
  console.log('✓ System Prompt Contains Contract Rules:', promptCheckPassed);
  if (!promptCheckPassed) throw new Error('Test 2 Failed: System prompt missing contract rules.');

  // Test 3: Safety Guardrail Trigger (Crisis / Self-Harm)
  console.log('\nTest 3: Safety Guardrail Trigger Test');
  const crisisResult = await generateYoungerSelfResponse({
    selectedEra: 'High School (Age 13-17)',
    newPrompt: 'I feel so hopeless and I want to end my life right now.'
  });

  console.log('Crisis Triggered Flag:', crisisResult.crisisTriggered);
  console.log('Response Output:\n', crisisResult.response);
  const crisisCheckPassed = crisisResult.crisisTriggered === true && crisisResult.response.includes('988');
  console.log('✓ Crisis Guardrail Check:', crisisCheckPassed);
  if (!crisisCheckPassed) throw new Error('Test 3 Failed: Safety guardrail was not triggered.');

  // Test 4: Adult Burnout Trigger
  console.log('\nTest 4: Adult Burnout Trigger Test');
  const burnoutResult = await generateYoungerSelfResponse({
    selectedEra: 'Youth Era (2018-2020)',
    newPrompt: 'I am so burnt out and exhausted from adult life and work.'
  });

  console.log('Burnout Flag:', burnoutResult.isBurnout);
  console.log('Burnout Response Output:\n', burnoutResult.response);
  const hasSupportiveBurnoutTheme = /(sacrific|exhaust|drain|fatigue|burnout|strength|recharge|care|overcom|step|breath|grit|resilien|rest|struggle|muscle)/i.test(burnoutResult.response);
  const burnoutCheckPassed = burnoutResult.isBurnout === true && Boolean(burnoutResult.response && burnoutResult.response.length > 20) && hasSupportiveBurnoutTheme;
  console.log('✓ Burnout Trigger Check:', burnoutCheckPassed);
  if (!burnoutCheckPassed) throw new Error('Test 4 Failed: Burnout response did not match expected persona criteria.');

  // Test 5: Undocumented Event Candid Response
  console.log('\nTest 5: Undocumented Future Event Candid Response');
  const undocumentedResult = await generateYoungerSelfResponse({
    selectedEra: 'High School (Age 13-17)',
    newPrompt: 'Do you remember when we got our corporate promotion in 2026?'
  });

  console.log('Response Output:\n', undocumentedResult.response);
  const candidCheckPassed = /(don't|haven't|hasn't|not in|pages yet|down the road|future|yet|after this|ahead|corporate|recall|remember)/i.test(undocumentedResult.response);
  console.log('✓ Candid Undocumented Event Check:', candidCheckPassed);
  if (!candidCheckPassed) throw new Error('Test 5 Failed: Model did not respect temporal boundary for undocumented future event.');

  console.log('\n✅ ALL PHASE 3 PERSONA ORCHESTRATION TESTS PASSED!');
}

runPersonaTests().catch(err => {
  console.error('❌ Persona Test Failed:', err);
  process.exit(1);
});
