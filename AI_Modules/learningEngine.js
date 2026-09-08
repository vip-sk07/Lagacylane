/**
 * Cognitive Continual Learning & Trajectory Synthesis Engine
 * 
 * Synthesizes long-term athletic and personal growth patterns from raw memory logs,
 * visual perceptions, and sentiment histories.
 * 
 * Features:
 *  1. Emotional Resilience Curve & Comeback Detection
 *  2. Milestone Archetype Classification
 *  3. Domain Mastery Trajectory Tracking
 *  4. Thematic Core Value Fingerprinting
 *  5. Continuous Knowledge Graph for Younger Self Persona Grounding
 */

// In-Memory User Cognitive Profiles Store
const userCognitiveProfiles = new Map();

/**
 * Milestone Archetype Definitions
 */
export const MILESTONE_ARCHETYPES = {
  THE_BREAKTHROUGH: {
    id: 'the_breakthrough',
    name: 'The Breakthrough',
    description: 'First major victory, trial selection, or milestone that validated the dream.',
    keywords: ['debut', 'first', 'selection', 'made the team', 'breakthrough', 'qualifier', 'start']
  },
  THE_LONG_GRIND: {
    id: 'the_long_grind',
    name: 'The Long Grind',
    description: 'Relentless early-morning drills, conditioning in bad weather, and quiet discipline.',
    keywords: ['drills', 'training', 'preseason', 'sweat', 'running', 'practice', 'sore', 'conditioning', '5am']
  },
  THE_COMEBACK: {
    id: 'the_comeback',
    name: 'The Comeback',
    description: 'Overcoming serious injury, devastating defeat, or losing streak with renewed grit.',
    keywords: ['injury', 'acl', 'rehab', 'recovery', 'defeat', 'bounce back', 'return', 'conquered', 'healed']
  },
  THE_CAMARADERIE: {
    id: 'the_camaraderie',
    name: 'The Camaraderie',
    description: 'Locker room bonds, team huddles, road trips, and shared sacrifice with brothers.',
    keywords: ['team', 'brother', 'teammate', 'huddle', 'squad', 'locker room', 'bus ride', 'coach']
  },
  THE_DEFINING_MOMENT: {
    id: 'the_defining_moment',
    name: 'The Defining Moment',
    description: 'High-stakes championship finish, trophy lift, or life pivot that echoes forever.',
    keywords: ['final', 'championship', 'trophy', 'gold', 'winner', 'buzzer', 'hat-trick', 'champion']
  },
  THE_QUIET_MILESTONE: {
    id: 'the_quiet_milestone',
    name: 'The Quiet Milestone',
    description: 'Personal realization, mentor conversation, or serene gratitude away from the crowd.',
    keywords: ['quiet', 'reflection', 'talk with coach', 'father', 'mother', 'gratitude', 'realized', 'peace']
  }
};

/**
 * Classifies a memory into one or more Milestone Archetypes.
 * 
 * @param {object} memory 
 * @returns {string} Archetype ID
 */
export function classifyMilestoneArchetype(memory = {}) {
  const combined = `${memory.title || ''} ${memory.description || memory.journal || ''} ${(memory.tags || []).join(' ')} ${memory.caption || ''}`.toLowerCase();

  // Check Comeback first (highest emotional weight)
  if (MILESTONE_ARCHETYPES.THE_COMEBACK.keywords.some(k => combined.includes(k))) {
    return MILESTONE_ARCHETYPES.THE_COMEBACK.id;
  }
  // Check Defining Moment
  if (MILESTONE_ARCHETYPES.THE_DEFINING_MOMENT.keywords.some(k => combined.includes(k))) {
    return MILESTONE_ARCHETYPES.THE_DEFINING_MOMENT.id;
  }
  // Check Breakthrough
  if (MILESTONE_ARCHETYPES.THE_BREAKTHROUGH.keywords.some(k => combined.includes(k))) {
    return MILESTONE_ARCHETYPES.THE_BREAKTHROUGH.id;
  }
  // Check Camaraderie
  if (MILESTONE_ARCHETYPES.THE_CAMARADERIE.keywords.some(k => combined.includes(k))) {
    return MILESTONE_ARCHETYPES.THE_CAMARADERIE.id;
  }
  // Check Grind
  if (MILESTONE_ARCHETYPES.THE_LONG_GRIND.keywords.some(k => combined.includes(k))) {
    return MILESTONE_ARCHETYPES.THE_LONG_GRIND.id;
  }

  return MILESTONE_ARCHETYPES.THE_QUIET_MILESTONE.id;
}

/**
 * Computes Emotional Resilience Trajectory from an array of memories.
 * Evaluates how the user overcomes adversity and maintains momentum.
 * 
 * @param {Array<object>} memories 
 * @returns {object} Resilience metrics
 */
export function computeEmotionalResilience(memories = []) {
  if (!memories || memories.length === 0) {
    return {
      resilienceScore: 85,
      resilienceTier: 'High Resilience',
      adversityOvercomeCount: 0,
      triumphsCount: 0,
      bounceBackTrajectory: 'Steadily ascending'
    };
  }

  let adversityCount = 0;
  let triumphCount = 0;
  let recoverySequences = 0;
  let lastWasAdversity = false;

  const sorted = [...memories].sort((a, b) => new Date(a.date || a.entryDate || 0) - new Date(b.date || b.entryDate || 0));

  sorted.forEach(mem => {
    const sentiment = typeof mem.sentiment === 'number' ? mem.sentiment : (mem.sentimentScore || 0.8);
    const normalized = sentiment <= 1.0 ? sentiment : (sentiment / 100);

    if (normalized < 0.45) {
      adversityCount++;
      lastWasAdversity = true;
    } else if (normalized >= 0.75) {
      triumphCount++;
      if (lastWasAdversity) {
        recoverySequences++;
        lastWasAdversity = false;
      }
    }
  });

  // Resilience score based on recovery sequences and triumphs vs adversity
  let score = 75;
  if (recoverySequences > 0) score += Math.min(recoverySequences * 8, 20);
  if (triumphCount > adversityCount) score += 5;
  score = Math.min(Math.max(score, 50), 98);

  return {
    resilienceScore: score,
    resilienceTier: score >= 88 ? 'Exceptional Mental Fortitude' : score >= 75 ? 'High Athletic Resilience' : 'Developing Fortitude',
    adversityOvercomeCount: adversityCount,
    triumphsCount: triumphCount,
    recoverySequences,
    bounceBackTrajectory: recoverySequences > 0 
      ? `Demonstrated ${recoverySequences} major turnaround(s) from setback to victory.`
      : 'Consistent positive trajectory and steady progression.'
  };
}

/**
 * Learns the user's Core Values Fingerprint from journal text and visual cues.
 * 
 * @param {Array<object>} memories 
 * @returns {Array<{ value: string, score: number, evidenceSnippet: string }>}
 */
export function extractThematicValues(memories = []) {
  const valuePillars = {
    Grit: { score: 0, snippet: '' },
    Camaraderie: { score: 0, snippet: '' },
    Precision: { score: 0, snippet: '' },
    Humility: { score: 0, snippet: '' },
    Purpose: { score: 0, snippet: '' }
  };

  memories.forEach(m => {
    const text = `${m.title || ''} ${m.journal || m.description || ''} ${m.caption || ''}`.toLowerCase();
    if (text.includes('sweat') || text.includes('grind') || text.includes('pain') || text.includes('rehab')) {
      valuePillars.Grit.score += 2;
      if (!valuePillars.Grit.snippet) valuePillars.Grit.snippet = m.title || 'Overcoming physical demands';
    }
    if (text.includes('team') || text.includes('brother') || text.includes('together') || text.includes('we')) {
      valuePillars.Camaraderie.score += 2;
      if (!valuePillars.Camaraderie.snippet) valuePillars.Camaraderie.snippet = m.title || 'Unshakable team bond';
    }
    if (text.includes('tactics') || text.includes('practice') || text.includes('drill') || text.includes('touch')) {
      valuePillars.Precision.score += 1.5;
      if (!valuePillars.Precision.snippet) valuePillars.Precision.snippet = m.title || 'Dedication to the craft';
    }
    if (text.includes('grateful') || text.includes('coach') || text.includes('learn') || text.includes('humble')) {
      valuePillars.Humility.score += 1.5;
      if (!valuePillars.Humility.snippet) valuePillars.Humility.snippet = m.title || 'Staying grounded through success';
    }
    if (text.includes('dream') || text.includes('future') || text.includes('legacy') || text.includes('promise')) {
      valuePillars.Purpose.score += 2;
      if (!valuePillars.Purpose.snippet) valuePillars.Purpose.snippet = m.title || 'A deep sense of mission';
    }
  });

  return Object.entries(valuePillars)
    .map(([value, data]) => ({
      value,
      strength: Math.min(Math.round(data.score * 10 + 40), 98),
      evidenceSnippet: data.snippet || 'Foundational throughout early seasons'
    }))
    .sort((a, b) => b.strength - a.strength);
}

/**
 * Updates the user's continuous cognitive learning graph with a newly ingested memory.
 * 
 * @param {object} params
 * @param {string} params.userId
 * @param {object} params.memory
 * @param {object} [params.visualPerception]
 * @returns {object} Updated cognitive profile
 */
export function updateContinuousLearningGraph({ userId = 'usr_default', memory, visualPerception }) {
  let profile = userCognitiveProfiles.get(userId);
  if (!profile) {
    profile = {
      userId,
      totalMemoriesIngested: 0,
      visualMemoriesCount: 0,
      archetypeCounts: {},
      resilienceTrajectory: null,
      topValues: [],
      recentLearnedMilestones: [],
      lastUpdated: new Date()
    };
    userCognitiveProfiles.set(userId, profile);
  }

  profile.totalMemoriesIngested += 1;
  if (visualPerception || memory.mediaUrl || memory.caption) {
    profile.visualMemoriesCount += 1;
  }

  // Classify archetype
  const archetype = classifyMilestoneArchetype(memory);
  profile.archetypeCounts[archetype] = (profile.archetypeCounts[archetype] || 0) + 1;

  // Add to recent milestone record
  profile.recentLearnedMilestones.unshift({
    title: memory.title,
    era: memory.era,
    domain: memory.domain,
    archetype,
    visualSummary: visualPerception?.visualSummary || memory.caption || null,
    sentiment: memory.sentimentScore,
    learnedAt: new Date().toISOString()
  });

  if (profile.recentLearnedMilestones.length > 20) {
    profile.recentLearnedMilestones = profile.recentLearnedMilestones.slice(0, 20);
  }

  // Update resilience and value traits
  profile.resilienceTrajectory = computeEmotionalResilience(profile.recentLearnedMilestones);
  profile.topValues = extractThematicValues(profile.recentLearnedMilestones);
  profile.lastUpdated = new Date();

  return profile;
}

/**
 * Retrieves the compiled cognitive learning profile for a user.
 * 
 * @param {string} userId 
 * @returns {object} Profile object
 */
export function getUserCognitiveProfile(userId = 'usr_default') {
  return userCognitiveProfiles.get(userId) || {
    userId,
    totalMemoriesIngested: 0,
    visualMemoriesCount: 0,
    archetypeCounts: {},
    resilienceTrajectory: computeEmotionalResilience([]),
    topValues: extractThematicValues([]),
    recentLearnedMilestones: [],
    lastUpdated: new Date()
  };
}

/**
 * Synthesizes learned insights for Younger Self system prompt injection.
 * 
 * @param {object} params
 * @param {string} params.userId
 * @param {string} params.era
 * @param {string} params.domain
 * @param {Array<object>} params.memories
 * @returns {string} Cognitive grounding context paragraph
 */
export function synthesizeLearnedInsights({ userId, era, domain, memories = [] }) {
  const profile = getUserCognitiveProfile(userId);
  const resilience = memories.length > 0 ? computeEmotionalResilience(memories) : (profile.resilienceTrajectory || computeEmotionalResilience([]));
  const values = memories.length > 0 ? extractThematicValues(memories) : (profile.topValues || extractThematicValues([]));
  const primaryValue = values[0]?.value || 'Grit';

  const archetypesPresent = Object.keys(profile.archetypeCounts).map(id => {
    const arch = Object.values(MILESTONE_ARCHETYPES).find(a => a.id === id);
    return arch ? arch.name : id;
  });

  let synthesis = `LEARNED COGNITIVE PROFILE & TRAJECTORY:
- Emotional Resilience Score: ${resilience.resilienceScore}/100 (${resilience.resilienceTier}).
- Comeback Narrative: ${resilience.bounceBackTrajectory}
- Core Guiding Value: ${primaryValue} (strength: ${values[0]?.strength || 85}%).`;

  if (archetypesPresent.length > 0) {
    synthesis += `\n- Mastered Milestone Archetypes: ${archetypesPresent.slice(0, 3).join(', ')}.`;
  }

  return synthesis;
}
