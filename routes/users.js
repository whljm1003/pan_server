const express = require('express');
const router = express.Router();

const { 
  login,
  accessToken,
  refreshToken
} = require('../controllers/users');

// * POST /users/login
router.post("/login", login);
// * GET /users/accessToken
router.get('/accessToken', accessToken);
// * GET /users/refreshToken
router.get('/refreshToken', refreshToken);

module.exports = router;
