const express = require('express');
const router = express.Router();

const mongoUtils = require('../utils/mongo-utils');
const client = require('../utils/redis-client');
const getAccessToken = require('../utils/get-access-token');

router.get('/', async function (req, res) {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    res.json({ text: 'Wrong parameters', code: 400 });
    return;
  }

  const username = getAccessToken(client, accessToken);

  const user = await mongoUtils.findOne('users', { username });

  res.json(user);
});
