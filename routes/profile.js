const express = require('express');
const router = express.Router();

const {profile} = require('../controllers/profile');
// * GET/profile
router.get("/profile", profile.get);
// * PUT/profile
router.put("/profile", profile.put);

module.exports = router;
