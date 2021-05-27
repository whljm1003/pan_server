const express = require('express');
const router = express.Router();

const {
    diary,
    diaryList,
    groupDiaryList,

} = require('../controllers/diaries');

// * POST /diaries
router.post("/diaries", diary.post);
// * GET / diaries
router.get("/diaries", diaryList);
// * GET / group diaries
router.get("/group-diaries", groupDiaryList);


module.exports = router;
