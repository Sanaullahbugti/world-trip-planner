const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = process.env.ENCRYPTION_KEY; // Ensure this is set in your environment variables

const encrypt = (text) => {
  const iv = crypto.randomBytes(16); // Generate a random initialization vector
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // Return the IV with the encrypted data for decryption
  return iv.toString('hex') + ':' + encrypted;
};

const decrypt = (hash) => {
  const parts = hash.split(':'); // Split the IV and the encrypted data
  const iv = Buffer.from(parts.shift(), 'hex'); // Get the IV
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let decrypted = decipher.update(parts.join(':'), 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = { encrypt, decrypt }; 