const checkAccessToken = require('../utils/check-access-token');

const client = require('../utils/redis-client');

async function authCheck(req, res, next) {
  const accessToken = req.headers.authorization;

  const isAccessTokenValid = await checkAccessToken(client, accessToken);

  if (isAccessTokenValid) {
    next();
  } else {
    res.status(400);
    res.json({ error: 'Access token expired or invalid', code: 400 });
    return;
  }
}

module.exports = authCheck;
