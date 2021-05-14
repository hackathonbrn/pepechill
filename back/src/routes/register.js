const express = require('express');
const router = express.Router();
const validations = require('../utils/validators');

/* GET home page. */
router.post('/register', function (req, res, next) {
  const { username, password } = req.body;

  if (!validations.usernameValidate(username) || !validations.passwordValidate(password))
    res.json({ text: 'Invalid credentials', code: 400 });
});

module.exports = router;
