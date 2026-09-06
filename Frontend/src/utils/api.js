/**
 * Centralized API service for LegacyLane
 * Driven by VITE_API_URL environment variable with fallback to http://localhost:5000
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Saves a new memory node to the backend database and triggers AI vector indexing.
 * Scoped by journeyType and domain.
 * @param {object} payload
 * @returns {Promise<object>}
 */
export async function saveMemoryApi(payload) {
  const res = await fetch(`${API_BASE_URL}/api/memories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: payload.userId,
      journeyType: payload.journeyType,
      domain: payload.domain,
      title: payload.title,
      era: payload.era,
      date: payload.date,
      matchDetails: payload.matchDetails,
      content: payload.content,
      victoryMessage: payload.victoryMessage,
      wisdomNote: payload.wisdomNote,
      stats: payload.stats,
      stars: payload.stars,
      mediaUrl: payload.mediaUrl || payload.media,
      tags: payload.tags
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Server returned ${res.status}: Failed to save memory`);
  }

  return await res.json();
}

/**
 * Fetches memories for a given user, scoped by journeyType and domain.
 * @param {string} userId
 * @param {string} journeyType
 * @param {string | null} domain
 * @returns {Promise<Array>}
 */
export async function fetchMemoriesApi(userId, journeyType, domain) {
  const queryParams = new URLSearchParams();
  if (journeyType) queryParams.set('journeyType', journeyType);
  if (domain) queryParams.set('domain', domain);

  const queryStr = queryParams.toString() ? `?${queryParams.toString()}` : '';
  const res = await fetch(`${API_BASE_URL}/api/memories/${userId}${queryStr}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Server returned ${res.status}: Failed to fetch memories`);
  }

  const data = await res.json();
  return data.memories || [];
}

/**
 * Persists the active journey and athlete profile to the user's account in database.
 * @param {string} userId
 * @param {object} profileData
 * @returns {Promise<object>}
 */
export async function updateUserProfileApi(userId, profileData) {
  const res = await fetch(`${API_BASE_URL}/api/profile/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      activeJourney: profileData.activeJourney,
      sportType: profileData.activeJourney?.domain || profileData.sportType || 'football',
      ...profileData
    })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Server returned ${res.status}: Failed to update profile`);
  }

  return await res.json();
}

/**
 * Uploads an image file to the backend media storage.
 * @param {File} file
 * @returns {Promise<string>} Uploaded file URL
 */
export async function uploadMediaApi(file) {
  const formData = new FormData();
  formData.append('media', file);

  const res = await fetch(`${API_BASE_URL}/api/upload`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    throw new Error(`Upload failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.url;
}

/**
 * Tests if the backend API service is reachable.
 * @returns {Promise<boolean>}
 */
export async function testApiConnection() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/memories/test-connection`);
    return res.ok;
  } catch {
    return false;
  }
}
