const express = require('express');
const router = express.Router();

const mongoUtils = require('../utils/mongo-utils');

const { ObjectId } = require('mongodb');

const client = require('../utils/redis-client');
const getAccessTokenData = require('../utils/get-access-token');

router.get('/', async function (req, res) {
  const { id } = req.query;

  if (!id) {
    res.json({ text: 'Wrong parameters', code: 400 });
    return;
  }

  const challenge = await mongoUtils.findOne('challenges', { _id: ObjectId(id) });

  res.json(challenge);
});

router.delete('/', async function (req, res) {
  const { id } = req.body;

  if (!id) {
    res.json({ text: 'Wrong parameters', code: 400 });
    return;
  }

  const username = await getAccessTokenData(client, req.headers.authorization);

  const challenge = await mongoUtils.findOne('challenges', { _id: ObjectId(id) });

  const user = await mongoUtils.findOne('users', { username });

  const challenges = user.challenges.filter(item => item !== id);

  const filteredUsers = challenge.users.filter(item => item.username !== username);

  await mongoUtils.updateOne('challenges', { _id: ObjectId(id) }, { users: filteredUsers });

  await mongoUtils.updateOne('users', { username: username }, { challenges: challenges });

  res.json({ text: 'Challenge removed' });
});

router.post('/', async function (req, res) {
  const { challenge } = req.body;

  if (!challenge) {
    res.json({ text: 'Wrong parameters', code: 400 });
    return;
  }

  await mongoUtils.insertOne('challenges', challenge);

  res.json({ text: 'ok', code: 200 });
});

module.exports = router;
