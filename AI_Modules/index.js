/**
 * AI Modules - Persona & Sentiment Analysis Engine
 * Connects to local Ollama (llama3 / qwen2.5) or provides rules-based fallbacks.
 */

const OLLAMA_HOST = 'http://localhost:11434';

/**
 * Checks if local Ollama server is running.
 */
export async function checkOllamaStatus() {
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/tags`);
    return res.ok;
  } catch (err) {
    return false;
  }
}

/**
 * Generates an Era-Grounded AI Younger Self Response.
 * @param {string} era - E.g. "Youth Era (2018-2020)"
 * @param {Array} memories - Array of memories matching this era
 * @param {string} userMessage - User's chat message
 */
export async function generatePersonaResponse(era, memories, userMessage) {
  const isOllamaLive = await checkOllamaStatus();

  const eraContext = memories.map(m => `${m.title}: ${m.content}`).join('\n');
  const systemPrompt = `You are the user's AI Younger Self during their ${era}. You speak with athletic passion, enthusiasm, and reflectiveness. Here are your memories from this era:\n${eraContext}\nRespond to the user naturally, concisely, and strictly in character.`;

  if (isOllamaLive) {
    try {
      const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          stream: false
        })
      });
      const data = await response.json();
      return data.message?.content || 'I remember practicing every single day to get here!';
    } catch (err) {
      console.error('Ollama Chat Generation Error, falling back:', err);
    }
  }

  // Fallback Persona Generation Rules
  const lowerMsg = userMessage.toLowerCase();
  let reply = `In our ${era}, we were fully focused on grinding and improving. No distraction could stop us!`;

  if (lowerMsg.includes('injury') || lowerMsg.includes('hurt') || lowerMsg.includes('pain')) {
    reply = `Ah, the physical setbacks were tough. But we knew we would push through rehab and return stronger than ever. The training is paying off!`;
  } else if (lowerMsg.includes('goal') || lowerMsg.includes('win') || lowerMsg.includes('score')) {
    reply = `Scoring that winning goal was pure magic! The feeling of the ball hitting the back of the net makes all the sweat worth it.`;
  } else if (lowerMsg.includes('dream') || lowerMsg.includes('future') || lowerMsg.includes('pro')) {
    reply = `We always dreamed of making it to the pro league and wearing jersey #10. I hope we make everyone proud!`;
  }

  return reply;
}

/**
 * Dynamically calculates sentiment score (-1 to 1) based on victory triggers.
 * @param {string} title
 * @param {string} content
 */
export function analyzeSentiment(title, content) {
  const text = (title + ' ' + content).toLowerCase();
  let score = 0.5; // neutral-positive default

  // Positive Triggers
  if (text.includes('win') || text.includes('victory') || text.includes('gold') || text.includes('trophy') || text.includes('champion')) {
    score += 0.45;
  }
  if (text.includes('hattrick') || text.includes('goal') || text.includes('century') || text.includes('mvp')) {
    score += 0.35;
  }
  // Negative Triggers
  if (text.includes('injury') || text.includes('acl') || text.includes('tear') || text.includes('hurt') || text.includes('defeat')) {
    score -= 0.85;
  }
  if (text.includes('struggle') || text.includes('dark') || text.includes('sad') || text.includes('pain')) {
    score -= 0.4;
  }

  return Math.min(Math.max(score, -1.0), 1.0);
}
