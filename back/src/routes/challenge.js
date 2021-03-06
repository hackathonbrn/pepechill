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

router.post('/delete', async function (req, res) {
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
  const { caption, text, target, users } = req.body;

  if (!caption || !text || !target || !users) {
    res.json({ text: 'Wrong parameters', code: 400 });
    return;
  }

  await mongoUtils.insertOne('challenges', { caption, target, text, users });
  const m = await mongoUtils.findOne('challenges', { caption: caption, target: target, text: text });
  const user = await mongoUtils.findOne('users', { username: users[0].username });

  user.challenges.push(String(m._id));

  await mongoUtils.updateOne('users', { username: users[0].username }, { challenges: user.challenges });

  res.json({ text: 'ok', code: 200 });
});

router.put('/', async function (req, res) {
  const { _id, caption, text, target, users } = req.body;

  if (!caption || !text || !target || !users || !_id) {
    res.json({ text: 'Wrong parameters', code: 400 });
    return;
  }

  const updatedChallenge = await mongoUtils.updateOne(
    'challenges',
    { _id: ObjectId(_id) },
    { caption: caption, text: text, target: target, users: users }
  );
  console.log(updatedChallenge);
  res.status(200);
  res.json({ text: 'Updated', code: 200 });
});

router.post('/add', async function (req, res) {
  const { id } = req.body;
  const username = await getAccessTokenData(client, req.headers.authorization);

  if (!id || !username) {
    res.json({ text: 'Wrong parameters', code: 400 });
    return;
  }

  const user = await mongoUtils.findOne('users', { username: username });
  const challenge = await mongoUtils.findOne('challenges', { _id: ObjectId(id) });

  user.challenges.push(String(id));
  challenge.users.push({ username: username, records: [] });
  await mongoUtils.updateOne('challenges', { _id: ObjectId(id) }, { users: challenge.users });
  await mongoUtils.updateOne('users', { username: username }, { challenges: user.challenges });

  res.status(200);
  res.json({ text: 'Accepted', code: 200 });
});

module.exports = router;
