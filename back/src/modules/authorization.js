const checkRefreshToken = require('../utils/checkRefreshToken');
const createAccessToken = require('../utils/createAccessToken');
const createRefreshToken = require('../utils/createRefreshToken');

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

async function requestNewTokens(req, res, redisClient) {
  const data = req.body.username;

  const accessToken = await createAccessToken(redisClient, data);
  const refreshToken = await createRefreshToken(redisClient, data);

  res.json({ accessToken, refreshToken });
}

module.exports = {
  requestNewAccessToken,
  requestNewTokens,
};
