const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
})

const {
    diary
} = require('../controllers/diaries');

// * POST /diaries
router.post("/diaries", upload.single('img'), diary.post);


module.exports = router;
