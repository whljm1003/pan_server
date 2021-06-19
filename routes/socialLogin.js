const express = require('express');
const router = express.Router();

const {
    kakao
} = require('../controllers/socialLogin');

// *POST/kakao
router.post('/kakao', kakao);

module.exports = router;