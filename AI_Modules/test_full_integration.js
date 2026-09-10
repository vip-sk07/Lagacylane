import { generateMotivationalWisdom, generateYoungerSelfResponse } from './index.js';

async function testMotivationalIntegration() {
  console.log('Testing AI Motivational Engine & Node Learning...');

  const sampleNodes = [
    {
      id: 1,
      title: 'First Rainy Morning Practice',
      date: '2023-01-15',
      era: 'Youth & Formative Years',
      journal: 'Woke up at 5am in freezing rain. Missed my first three shots and felt like quitting on the sideline.',
      sentiment: 42,
      sentimentLabel: 'Pure Grit 🥊',
      photos: [{ url: '/uploads/rainy_morning.jpg', caption: 'Lacing muddy cleats under the floodlights' }]
    },
    {
      id: 2,
      title: 'Summer League Breakthrough',
      date: '2023-07-22',
      era: 'Youth & Formative Years',
      journal: 'Scored 24 points in the second half. Coach said I earned the starting spot through sheer work ethic.',
      sentiment: 95,
      sentimentLabel: 'Pure Euphoria 🔥',
      photos: [{ url: '/uploads/summer_trophy.jpg', caption: 'Holding the summer tournament cup with the team' }]
    },
    {
      id: 3,
      title: 'Regional Championship Clutch Winner',
      date: '2024-03-10',
      era: 'Varsity Era',
      journal: 'Down by 2 with 8 seconds left. Remembered that rainy morning and hit the buzzer beater as the horn sounded.',
      sentiment: 98,
      sentimentLabel: 'Eternal Gratitude 🕊️',
      photos: [{ url: '/uploads/championship_celebration.jpg', caption: 'Cut down the nets together with Dad' }]
    }
  ];

  // 1. Test generateMotivationalWisdom
  const query1 = "I am feeling burnt out and exhausted today. What should I do?";
  const wisdom1 = generateMotivationalWisdom(sampleNodes, query1, 'Athlete');
  console.log('\n--- Test 1: Motivational Wisdom Output ---');
  console.log(wisdom1);

  if (!wisdom1.includes('2023-01-15') || !wisdom1.includes('Regional Championship Clutch Winner')) {
    throw new Error('Wisdom failed to quote chronological nodes and dates!');
  }
  console.log('Test 1 PASSED: Correctly quoted earliest struggle, peak comeback, and dates!');

  // 2. Test photo awareness in motivational wisdom
  const query2 = "What do you see in the pictures from our journey?";
  const wisdom2 = generateMotivationalWisdom(sampleNodes, query2, 'Athlete');
  console.log('\n--- Test 2: Photo-Aware Wisdom Output ---');
  console.log(wisdom2);
  if (!wisdom2.includes('Lacing muddy cleats') && !wisdom2.includes('tournament cup')) {
    throw new Error('Wisdom failed to quote photo captions!');
  }
  console.log('Test 2 PASSED: Photo captions quoted dynamically!');

  // 3. Test generateYoungerSelfResponse fallback integration
  const response = await generateYoungerSelfResponse({
    userMessage: "Tell me what we were feeling when things were hard.",
    era: "Varsity Era",
    journeyType: "sports",
    domain: "football",
    clientMemories: sampleNodes
  });
  console.log('\n--- Test 3: Younger Self Persona Response ---');
  console.log(response);
  if (!response || response.length < 50) {
    throw new Error('Response is too short or empty');
  }
  console.log('Test 3 PASSED: Younger Self response generated successfully!');

  console.log('\nALL MOTIVATIONAL & NODE LEARNING INTEGRATION TESTS PASSED 100%!');
}

testMotivationalIntegration().catch(err => {
  console.error('Test FAILED:', err);
  process.exit(1);
});
