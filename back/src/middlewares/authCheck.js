const checkAccessToken = require('../utils/checkAccessToken');

const client = require('../utils/redisClient');

async function authCheck(req, res, next) {
  const token = req.headers.authorization;

  checkAccessToken(client, token).then(isAccessTokenValid => {
    if (isAccessTokenValid) {
      return;
    } else {
      res.status(400);
      res.json({ error: 'Access token expired or invalid', code: 400 });
      return;
    }
  });
}

module.exports = authCheck;
