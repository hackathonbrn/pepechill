const jwt = require('jsonwebtoken');
const { privateKey2 } = require('./constants');
const { promisify } = require('util');

/**
 * @param redisClient - redis client
 * @param {String} token - refresh token
 */
async function checkRefreshToken(redisClient, token) {
  redisClient.sendCommand('SELECT', ['1']);

  const getAsync = promisify(redisClient.get).bind(redisClient);
  let res = await getAsync(token);

  if (res) {
    try {
      jwt.verify(token, privateKey2);
    } catch (error) {
      console.log('Wrong refresh token. Error: ', error);
      return false;
    }

    return true;
  }

  return false;
}

module.exports = checkRefreshToken;
