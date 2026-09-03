import crypto from 'crypto';

// Default 32-byte secret key fallback for AES-256 (if ENCRYPTION_KEY is not in env)
const DEFAULT_KEY = process.env.ENCRYPTION_KEY || 'legacylane-secure-memory-encryption-key-32b!';
const ALGORITHM = 'aes-256-gcm';

/**
 * Encrypts raw plaintext journal entry using AES-256-GCM.
 * @param {string} text - Plaintext journal text
 * @param {string} [secretKey] - Optional secret key override
 * @returns {object} Encrypted object containing ciphertext, iv, and authTag (base64)
 */
export function encryptText(text, secretKey = DEFAULT_KEY) {
  if (!text) return { encryptedData: '', iv: '', authTag: '' };

  // Ensure key is 32 bytes
  const key = crypto.createHash('sha256').update(secretKey).digest();
  const iv = crypto.randomBytes(12); // 96-bit IV recommended for GCM

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  return {
    ciphertext: encrypted,
    iv: iv.toString('hex'),
    authTag: authTag,
    // Combined string format for easy database storage: iv:authTag:ciphertext
    encoded: `${iv.toString('hex')}:${authTag}:${encrypted}`
  };
}

/**
 * Decrypts AES-256-GCM encrypted payload back into plaintext.
 * @param {string|object} payload - Encrypted string (iv:authTag:ciphertext) or object
 * @param {string} [secretKey] - Optional secret key override
 * @returns {string} Decrypted plaintext text
 */
export function decryptText(payload, secretKey = DEFAULT_KEY) {
  try {
    if (!payload) return '';
    
    let ivHex, authTagHex, ciphertext;

    if (typeof payload === 'string') {
      const parts = payload.split(':');
      if (parts.length === 3) {
        [ivHex, authTagHex, ciphertext] = parts;
      } else {
        // Fallback for unencrypted legacy plain text
        return payload;
      }
    } else {
      ({ iv: ivHex, authTag: authTagHex, ciphertext } = payload);
    }

    const key = crypto.createHash('sha256').update(secretKey).digest();
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (err) {
    console.error('Decryption failed (text may be unencrypted or key mismatched):', err.message);
    return typeof payload === 'string' ? payload : '';
  }
}
