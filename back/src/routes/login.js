const express = require('express');
const router = express.Router();
const validations = require('../utils/validators');
const mongoUtils = require('../utils/mongo-utils');
const { requestNewTokens } = require('../modules/authorization');
const bcrypt = require('bcrypt');

const client = require('../utils/redis-client');

router.post('/', async function (req, res) {
  const { username, password } = req.body;

  if (!validations.usernameValidate(username) || !validations.passwordValidate(password)) {
    res.json({ text: 'Invalid credentials', code: 400 });
    return;
  }

  const data = await mongoUtils.findOne('users', { username });

  if (data) {
    const identical = await bcrypt.compare(password, data.password);

    if (identical) {
      const tokens = await requestNewTokens(data.username, client);
      res.json(tokens);
      return;
    } else {
      res.json({ text: 'Invalid credentials', code: 404 });
      return;
    }
  }
});

module.exports = router;
