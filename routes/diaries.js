const express = require('express');
const router = express.Router();

const {
    diary
} = require('../controllers/diaries');

// * POST /diaries
router.post("/diaries", diary.post);


module.exports = router;
