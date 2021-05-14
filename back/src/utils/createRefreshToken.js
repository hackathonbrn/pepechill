const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('Rprivate.key');
const { promisify } = require('util');

async function createRefreshToken(redisClient, data) {
  const refreshToken = jwt.sign(data, privateKey);

  const setAsync = promisify(redisClient.set).bind(redisClient);

  await setAsync(refreshToken, '1');

  return refreshToken;
}

module.exports = createRefreshToken;
