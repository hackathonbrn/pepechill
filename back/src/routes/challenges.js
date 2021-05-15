const express = require('express');
const router = express.Router();

const mongoUtils = require('../utils/mongo-utils');
const client = require('../utils/redis-client');
const getAccessTokenData = require('../utils/get-access-token');

const { ObjectId } = require('mongodb');

router.get('/', async function (req, res) {
  const username = await getAccessTokenData(client, req.headers.authorization);

  const user = await mongoUtils.findOne('users', { username });

  console.log(user);

  const challenges = await mongoUtils.find('challenges', { _id: { $in: user.challenges.map(item => ObjectId(item)) } });

  res.json(challenges);
});

module.exports = router;
