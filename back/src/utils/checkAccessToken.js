const jwt = require('jsonwebtoken');
const { privateKey1 } = require('./constants');
const { promisify } = require('util');

/**
 * @param redisClient - redis client
 * @param {String} token - access token
 */
async function checkAccessToken(redisClient, token) {
  redisClient.sendCommand('SELECT', ['0']);

  const getAsync = promisify(redisClient.get).bind(redisClient);
  let res = await getAsync(token);

  if (res) {
    try {
      jwt.verify(token, privateKey1);
    } catch (error) {
      console.log('Wrong access token. Error: ', error);
      return false;
    }

    return true;
  }

  return false;
}

module.exports = checkAccessToken;
