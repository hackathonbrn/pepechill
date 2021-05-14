const checkAccessToken = require('../../utils/checkAccessToken');

const tokenRegexp = /[a-z-A-Z\d._]/gm;

function authCheck(redisClient) {
  return async (req, res, next) => {
    const token = req.headers.authorization;

    if (!tokenRegexp.test(req.headers.authorization)) {
      res.status(400);
      res.json({ error: 'Wrong auth header', code: 400 });
      return;
    }

    const isAccessTokenValid = await checkAccessToken(redisClient, token);

    if (isAccessTokenValid) {
      next();
    } else {
      res.status(400);
      res.json({ error: 'Access token expired', error: 400 });
    }
  };
}

module.exports = authCheck;
