import { JOURNEY_TYPES, SPORT_DOMAINS, LIFE_DOMAIN, DEFAULT_JOURNEY } from '../data/journeyConfig';

/**
 * Checks if the given journey is a sports journey.
 * @param {{ type: string, domain?: string | null }} journey
 * @returns {boolean}
 */
export function isSportsJourney(journey) {
  return journey?.type === JOURNEY_TYPES.SPORTS;
}

/**
 * Returns the active domain descriptor (either from SPORT_DOMAINS or LIFE_DOMAIN).
 * Supports both structured journey object { type, domain } and legacy sport strings.
 * @param {{ type?: string, domain?: string | null } | string} journey
 * @returns {object}
 */
export function getActiveDomainDescriptor(journey) {
  if (!journey) {
    return LIFE_DOMAIN;
  }

  // Handle legacy string inputs (e.g. 'football', 'basketball', 'cricket', 'athletics', 'journaler', 'life')
  if (typeof journey === 'string') {
    const lower = journey.toLowerCase();
    if (lower === 'life' || lower === 'journaler') {
      return LIFE_DOMAIN;
    }
    const match = SPORT_DOMAINS.find((d) => d.id === lower);
    return match || SPORT_DOMAINS[0];
  }

  if (!isSportsJourney(journey)) {
    return LIFE_DOMAIN;
  }
  const domain = journey.domain;
  const match = SPORT_DOMAINS.find((d) => d.id === domain);
  return match || SPORT_DOMAINS[0];
}

/**
 * Retrieves the 3D scene builders registered for the active journey/domain.
 * @param {{ type?: string, domain?: string | null } | string} journey
 * @returns {{ buildGround?: Function, buildBall?: Function, buildAccessory?: Function }}
 */
export function getDomainSceneBuilder(journey) {
  const descriptor = getActiveDomainDescriptor(journey);
  return {
    buildGround: descriptor.buildGround,
    buildBall: descriptor.buildBall,
    buildAccessory: descriptor.buildAccessory
  };
}

/**
 * Returns the theme object for the active journey.
 * @param {{ type: string, domain?: string | null }} journey
 * @returns {object}
 */
export function getActiveTheme(journey) {
  const descriptor = getActiveDomainDescriptor(journey);
  return descriptor.theme;
}

/**
 * Retrieves the active profile from the structured profiles store.
 * Supports { sports: { ... }, life: { ... } } structure with fallback for flat maps.
 * @param {{ type: string, domain?: string | null }} journey
 * @param {object} profiles
 * @returns {object | null}
 */
export function getActiveProfile(journey, profiles) {
  if (!profiles) return null;

  if (!isSportsJourney(journey)) {
    return profiles.life || profiles.journaler || null;
  }

  const domain = journey?.domain || 'football';
  if (profiles.sports) {
    return (
      profiles.sports[domain] ||
      profiles.sports.football ||
      Object.values(profiles.sports)[0] ||
      null
    );
  }

  // Fallback for flat athlete profile map
  return profiles[domain] || profiles.football || null;
}

/**
 * Returns the Three.js scene key for the active journey.
 * @param {{ type: string, domain?: string | null }} journey
 * @returns {string}
 */
export function getThreeSceneKey(journey) {
  const descriptor = getActiveDomainDescriptor(journey);
  return descriptor.threeSceneKey || 'football';
}

/**
 * Loads the active journey from URL query parameters or localStorage.
 * Synchronizes with legacy journey-selection keys.
 * @returns {{ type: string, domain: string | null }}
 */
export function loadSavedJourney() {
  if (typeof window === 'undefined') return DEFAULT_JOURNEY;

  try {
    // 1. Check URL parameters
    const params = new URLSearchParams(window.location.search);
    const modeParam = params.get('mode');
    const sportParam = params.get('sport');

    if (modeParam === 'life') {
      return { type: JOURNEY_TYPES.LIFE, domain: null };
    }
    if (modeParam === 'sports' || sportParam) {
      const matchedDomain = SPORT_DOMAINS.find((d) => d.id === (sportParam || '').toLowerCase());
      return {
        type: JOURNEY_TYPES.SPORTS,
        domain: matchedDomain ? matchedDomain.id : 'football'
      };
    }

    // 2. Check modern localStorage key
    const modernSaved = localStorage.getItem('legacylane_active_journey');
    if (modernSaved) {
      const parsed = JSON.parse(modernSaved);
      if (parsed?.type === JOURNEY_TYPES.LIFE) {
        return { type: JOURNEY_TYPES.LIFE, domain: null };
      }
      if (parsed?.type === JOURNEY_TYPES.SPORTS && parsed?.domain) {
        return { type: JOURNEY_TYPES.SPORTS, domain: parsed.domain };
      }
    }

    // 3. Check legacy localStorage key from journey-selection.html
    const legacyMode = localStorage.getItem('legacy_journey_mode');
    if (legacyMode === 'LIFE') {
      return { type: JOURNEY_TYPES.LIFE, domain: null };
    }
    if (legacyMode === 'SPORTS') {
      try {
        const legacyProfile = JSON.parse(localStorage.getItem('legacy_athlete_profile') || '{}');
        const legacySport = (legacyProfile.sport || 'football').toLowerCase();
        const matchedDomain = SPORT_DOMAINS.find((d) => d.id === legacySport);
        return {
          type: JOURNEY_TYPES.SPORTS,
          domain: matchedDomain ? matchedDomain.id : 'football'
        };
      } catch {
        return { type: JOURNEY_TYPES.SPORTS, domain: 'football' };
      }
    }
  } catch (err) {
    console.warn('Could not read saved journey from localStorage:', err);
  }

  return DEFAULT_JOURNEY;
}

/**
 * Persists active journey to localStorage and synchronizes with legacy keys.
 * @param {{ type: string, domain: string | null }} journey
 */
export function saveJourney(journey) {
  if (typeof window === 'undefined' || !journey) return;

  try {
    localStorage.setItem('legacylane_active_journey', JSON.stringify(journey));

    if (isSportsJourney(journey)) {
      localStorage.setItem('legacy_journey_mode', 'SPORTS');
      const prevProfile = JSON.parse(localStorage.getItem('legacy_athlete_profile') || '{}');
      localStorage.setItem(
        'legacy_athlete_profile',
        JSON.stringify({
          ...prevProfile,
          sport: journey.domain || 'football',
          updatedAt: new Date().toISOString()
        })
      );
    } else {
      localStorage.setItem('legacy_journey_mode', 'LIFE');
    }
  } catch (err) {
    console.warn('Could not save journey to localStorage:', err);
  }
}

