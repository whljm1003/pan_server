const express = require('express');
const router = express.Router();

const {
  login,
  accessToken,
  refreshToken,
  signup,
  withdrawal,
  userGroup
} = require('../controllers/users');

// * POST /users/login
router.post("/login", login);
// * GET /users/accessToken
router.get('/accessToken', accessToken);
// * GET /users/refreshToken
router.get('/refreshToken', refreshToken);
// * POST /users/signup
router.post('/signup', signup);
// * DELETE /withdrawal
router.delete('/withdrawal', withdrawal);
// * POST /users/user-group
router.post('/user-group', userGroup.sendMail);
// * GET /invite/?token
router.get('/invite', userGroup.createGroup);

module.exports = router;
