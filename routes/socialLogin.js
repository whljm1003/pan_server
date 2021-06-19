const express = require('express');
const router = express.Router();

const {
    kakao,
    google
} = require('../controllers/socialLogin');

// *POST/kakao
router.post('/kakao', kakao);

// *POST/google
router.post('/google', google);

module.exports = router;