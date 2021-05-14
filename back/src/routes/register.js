const express = require('express');
const router = express.Router();
const validations = require('../utils/validators');
const mongoUtils = require('../utils/mongoUtils');

router.post('/register', async function (req, res, next) {
  const { username, password, name } = req.body;

  if (!validations.usernameValidate(username) || !validations.passwordValidate(password)) {
    res.json({ text: 'Invalid credentials', code: 400 });
  }

  const data = await mongoUtils.find('users', { username });

  if (data.length) {
    res.json({ text: 'User already exist', code: 400 });
    return;
  }

  await mongoUtils.insertOne('users', { username, password, name, activities: [] });

  res.status(200);
  res.json({ username, name, activities: [] });
});

module.exports = router;
