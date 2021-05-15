const jwt = require('jsonwebtoken');
const { privateKey1 } = require('./constants');
const { promisify } = require('util');

async function createAccessToken(redisClient, data) {
  redisClient.sendCommand('SELECT', ['0']);

  const accessToken = jwt.sign({ data }, privateKey1, { expiresIn: 1800 });

  const setAsync = promisify(redisClient.set).bind(redisClient);

  await setAsync(accessToken, data);

  return accessToken;
}

module.exports = createAccessToken;
