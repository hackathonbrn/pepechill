const express = require('express');
const router = express.Router();

const client = require('../utils/redis-client');
const checkRefreshToken = require('../utils/check-refresh-token');
const createAccessToken = require('../utils/create-access-token');

router.post('/', async function (req, res) {
  const { refreshToken, username } = req.body;

  if (!refreshToken || !username) {
    res.json({ text: 'Invalid data', code: 400 });
    return;
  }

  const isRefreshTokenValid = await checkRefreshToken(client, refreshToken);

  if (isRefreshTokenValid) {
    const accessToken = await createAccessToken(client, username);

    res.status(200);
    res.json({ accessToken });
    return;
  } else {
    res.json({ text: 'Refresh token is invalid', code: 400 });
    return;
  }
});

module.exports = router;
