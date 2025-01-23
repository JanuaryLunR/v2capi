const crypto = require('crypto');

function encryptToByteArray(plaintext, key) {
  if (key.length !== 16) {
    throw new Error('Key must be exactly 16 bytes long.');
  }

  const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(key, 'utf8'), null);
  cipher.setAutoPadding(true);

  const encryptedBuffer = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const encryptedBytes = Array.from(encryptedBuffer).map((byte) => (byte > 127 ? byte - 256 : byte));

  const hash = crypto.createHash('sha256').update(encryptedBuffer).digest();
  const hashBytes = Array.from(hash).map((byte) => (byte > 127 ? byte - 256 : byte));

  const signature = hash.toString('base64');

  // console.log('signature, ', signature)

  return {
    encryptedBytes,
    hashBytes,  
    signature,
  };
}

module.exports = {
  encryptToByteArray,
}