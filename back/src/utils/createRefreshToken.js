const jwt = require('jsonwebtoken');
const { privateKey2 } = require('./constants');
const { promisify } = require('util');

async function createRefreshToken(redisClient, data) {
  redisClient.sendCommand('SELECT', ['1']);

  const refreshToken = jwt.sign({ data }, privateKey2, { expiresIn: '7d' });

  const setAsync = promisify(redisClient.set).bind(redisClient);

  await setAsync(refreshToken, '1');

  return refreshToken;
}

module.exports = createRefreshToken;
