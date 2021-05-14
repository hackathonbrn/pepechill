const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('Aprivate.key');
const { promisify } = require('util');

async function createAccessToken(redisClient, data) {
  const accessToken = jwt.sign(data, privateKey);

  const setAsync = promisify(redisClient.set).bind(redisClient);

  await setAsync(accessToken, '1');

  return accessToken;
}

module.exports = createAccessToken;
