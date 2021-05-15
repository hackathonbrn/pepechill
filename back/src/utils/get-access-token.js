const { promisify } = require('util');

/**
 * @param redisClient - redis client
 * @param {String} token - access token
 */
async function getAccessToken(redisClient, token) {
  redisClient.sendCommand('SELECT', ['0']);

  const getAsync = promisify(redisClient.get).bind(redisClient);
  let res = await getAsync(token);

  if (res) {
    return res;
  }

  return false;
}

module.exports = getAccessToken;
