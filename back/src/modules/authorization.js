const checkRefreshToken = require('../utils/check-refresh-token');
const createAccessToken = require('../utils/create-access-token');
const createRefreshToken = require('../utils/create-refresh-token');

const tokenRegexp = /[a-z-A-Z\d._]/gm;

/**
 * @param {*} req - request
 * @param {*} res - response
 * @param {*} redisClient - redisClient
 */
async function requestNewAccessToken(req, res, redisClient) {
  const refreshToken = req.body.refreshToken;

  if (!tokenRegexp.test(refreshToken)) {
    res.status(400);
    res.json({ error: 'Wrong refresh token', code: 400 });
    return;
  }

  const isRefreshTokenValid = await checkRefreshToken(redisClient, refreshToken);

  if (!isRefreshTokenValid) {
    res.status(400);
    res.json({ error: 'Wrong refresh token', code: 401 });
    return;
  }

  const data = req.body.username;

  const accessToken = await createAccessToken(redisClient, data);

  res.status(200);
  res.json({ accessToken });
}

async function requestNewTokens(data, redisClient) {
  const accessToken = await createAccessToken(redisClient, data);
  const refreshToken = await createRefreshToken(redisClient, data);

  return { accessToken, refreshToken };
}

module.exports = {
  requestNewAccessToken,
  requestNewTokens,
};
