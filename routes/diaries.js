const express = require('express');
const router = express.Router();

const {
    diary,
    diaryList,

} = require('../controllers/diaries');

// * POST /diaries
router.post("/diaries", diary.post);
// * GET / diaries
router.get("/diaries", diaryList);


module.exports = router;
