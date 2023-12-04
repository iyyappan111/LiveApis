const crypto = require('crypto');

const IV_LENGTH = 16; // 16 bytes (128 bits) for AES-256-CBC
const KEY_LENGTH = 32; // 32 bytes (256 bits) for AES-256

function generateRandomIV() {
  return crypto.randomBytes(IV_LENGTH).toString('hex');
}

function generateRandomKey() {
  return crypto.randomBytes(KEY_LENGTH).toString('hex');
}

function encrypt(text, iv, key) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv + ':' + encrypted;
}

function decrypt(text, key) {
  let textParts = text.split(':');
  let iv = textParts.shift();
  let encryptedText = textParts.join(':');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { generateRandomIV, generateRandomKey, encrypt, decrypt };
