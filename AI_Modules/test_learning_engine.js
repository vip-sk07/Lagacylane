import { 
  classifyMilestoneArchetype, 
  computeEmotionalResilience, 
  extractThematicValues, 
  updateContinuousLearningGraph, 
  getUserCognitiveProfile, 
  synthesizeLearnedInsights,
  MILESTONE_ARCHETYPES 
} from './index.js';

async function runLearningEngineTests() {
  console.log('🚀 --- LEGACYLANE CONTINUAL COGNITIVE LEARNING TEST SUITE --- 🚀\n');

  // Test 1: Milestone Archetype Classification
  console.log('Test 1: Milestone Archetype Classification');
  const m1 = { title: 'Torn Meniscus Rehab', description: 'Doctors said 6 months. Conquered the injury in 4 months with daily recovery drills.' };
  const m2 = { title: 'First Team Debut', description: 'Coach called my name in the 70th minute. First trial breakthrough.' };
  const m3 = { title: 'State Trophy Lift', description: 'Final whistle blew, championship trophy hoisted in the air.' };
  const m4 = { title: 'Rainy 5am Preseason Drills', description: 'Sweat mixing with mud, conditioning sprints across the field.' };

  const arch1 = classifyMilestoneArchetype(m1);
  const arch2 = classifyMilestoneArchetype(m2);
  const arch3 = classifyMilestoneArchetype(m3);
  const arch4 = classifyMilestoneArchetype(m4);

  console.log('Archetype 1 (Rehab/Injury):', arch1);
  console.log('Archetype 2 (Debut):', arch2);
  console.log('Archetype 3 (Trophy):', arch3);
  console.log('Archetype 4 (Drills):', arch4);

  const test1Passed = (
    arch1 === MILESTONE_ARCHETYPES.THE_COMEBACK.id &&
    arch2 === MILESTONE_ARCHETYPES.THE_BREAKTHROUGH.id &&
    arch3 === MILESTONE_ARCHETYPES.THE_DEFINING_MOMENT.id &&
    arch4 === MILESTONE_ARCHETYPES.THE_LONG_GRIND.id
  );
  console.log('✓ Archetype Classification Check:', test1Passed);
  if (!test1Passed) throw new Error('Test 1 failed');

  // Test 2: Emotional Resilience Curve & Comeback Detection
  console.log('\nTest 2: Emotional Resilience Curve & Comeback Detection');
  const trajectoryMemories = [
    { title: 'Crucial Loss', sentiment: 25, date: '2019-02-10' },
    { title: 'Comeback Derby Win', sentiment: 92, date: '2019-04-15' },
    { title: 'Training Setback', sentiment: 35, date: '2019-07-20' },
    { title: 'Championship Trophy', sentiment: 98, date: '2019-11-05' }
  ];

  const resilience = computeEmotionalResilience(trajectoryMemories);
  console.log('Resilience Score:', resilience.resilienceScore);
  console.log('Resilience Tier:', resilience.resilienceTier);
  console.log('Recovery Sequences:', resilience.recoverySequences);
  console.log('Trajectory Summary:', resilience.bounceBackTrajectory);

  const test2Passed = (
    resilience.resilienceScore >= 85 &&
    resilience.recoverySequences >= 2 &&
    resilience.adversityOvercomeCount === 2
  );
  console.log('✓ Resilience Curve Check:', test2Passed);
  if (!test2Passed) throw new Error('Test 2 failed');

  // Test 3: Thematic Core Values Extraction
  console.log('\nTest 3: Thematic Core Values Extraction');
  const values = extractThematicValues([
    { title: '5am Sprints', description: 'Sweat and grind every morning, pushing through the soreness.', caption: '' },
    { title: 'Locker Room Bond', description: 'My brothers and teammates stood by each other through thick and thin.', caption: '' }
  ]);

  console.log('Extracted Core Values:', values.map(v => `${v.value}: ${v.strength}%`));
  const test3Passed = values.some(v => v.value === 'Grit' && v.strength > 50) && values.some(v => v.value === 'Camaraderie');
  console.log('✓ Thematic Values Check:', test3Passed);
  if (!test3Passed) throw new Error('Test 3 failed');

  // Test 4: Continuous Knowledge Graph Updates & Profile Ingestion
  console.log('\nTest 4: Continuous Knowledge Graph Updates & Profile Retrieval');
  const testUser = 'usr_test_athlete_42';
  updateContinuousLearningGraph({
    userId: testUser,
    memory: m1,
    visualPerception: { visualSummary: 'Photo of knee brace and gym weights' }
  });
  updateContinuousLearningGraph({
    userId: testUser,
    memory: m3,
    visualPerception: { visualSummary: 'Lifting gold trophy on podium' }
  });

  const profile = getUserCognitiveProfile(testUser);
  console.log('Total Memories Ingested:', profile.totalMemoriesIngested);
  console.log('Visual Memories Count:', profile.visualMemoriesCount);
  console.log('Archetype Counts:', profile.archetypeCounts);

  const test4Passed = (
    profile.totalMemoriesIngested === 2 &&
    profile.visualMemoriesCount === 2 &&
    profile.archetypeCounts[MILESTONE_ARCHETYPES.THE_COMEBACK.id] === 1 &&
    profile.archetypeCounts[MILESTONE_ARCHETYPES.THE_DEFINING_MOMENT.id] === 1
  );
  console.log('✓ Continuous Graph Update Check:', test4Passed);
  if (!test4Passed) throw new Error('Test 4 failed');

  // Test 5: Synthesis for Younger Self System Prompt Grounding
  console.log('\nTest 5: Synthesis for Younger Self System Prompt Grounding');
  const synthesis = synthesizeLearnedInsights({
    userId: testUser,
    era: 'Youth Era (2018-2020)',
    domain: 'football',
    memories: trajectoryMemories
  });

  console.log('Synthesized Context Snippet:\n', synthesis);
  const test5Passed = (
    synthesis.includes('Emotional Resilience Score:') &&
    synthesis.includes('Comeback Narrative:') &&
    synthesis.includes('Core Guiding Value:')
  );
  console.log('✓ Persona Synthesis Check:', test5Passed);
  if (!test5Passed) throw new Error('Test 5 failed');

  console.log('\n✅ ALL CONTINUAL COGNITIVE LEARNING TESTS PASSED!');
}

runLearningEngineTests().catch(err => {
  console.error('❌ Continual Learning Test Failed:', err);
  process.exit(1);
});
