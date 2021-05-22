const express = require('express');
const router = express.Router();

const {
  login,
  accessToken,
  refreshToken,
  signup
} = require('../controllers/users');

// * POST /users/login
router.post("/login", login);
// * GET /users/accessToken
router.get('/accessToken', accessToken);
// * GET /users/refreshToken
router.get('/refreshToken', refreshToken);
//* POST /users/signup
router.post('/signup', signup)

module.exports = router;
