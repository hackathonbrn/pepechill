const express = require('express');
const router = express.Router();
const validations = require('../utils/validators');
const mongoUtils = require('../utils/mongoUtils');
const bcrypt = require('bcrypt');

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
      res.json({ text: 'logged', code: 200 });
      return;
    } else {
      res.json({ text: 'Invalid credentials', code: 404 });
      return;
    }
  }
});

module.exports = router;
