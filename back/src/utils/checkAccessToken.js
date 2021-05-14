const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('Aprivate.key');
const { promisify } = require('util');

/**
 * @param redisClient - redis client
 * @param {String} token - access token
 */
async function checkAccessToken(redisClient, token) {
  //   redisClient.sendCommand('SELECT 0');

  const getAsync = promisify(redisClient.get).bind(redisClient);
  let res = await getAsync(token);

  if (res) {
    try {
      jwt.verify(token, privateKey);
    } catch (error) {
      console.log('Wrong access token. Error: ', error);
      return false;
    }

    return true;
  }

  return false;
}

module.exports = checkAccessToken;
