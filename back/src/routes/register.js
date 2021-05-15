const express = require('express');
const router = express.Router();
const validations = require('../utils/validators');
const mongoUtils = require('../utils/mongo-utils');
const bcrypt = require('bcrypt');

router.post('/', async function (req, res, next) {
  const { username, password, name } = req.body;

  if (!validations.usernameValidate(username) || !validations.passwordValidate(password)) {
    res.json({ text: 'Invalid credentials', code: 400 });
    return;
  }

  const data = await mongoUtils.find('users', { username });

  if (data.length) {
    res.json({ text: 'User already exist', code: 400 });
    return;
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = { username, password: hashedPass, name, challenges: [] };

  await mongoUtils.insertOne('users', newUser);

  res.status(200);
  res.json({ text: 'Registration completed', code: 200 });
});

module.exports = router;
