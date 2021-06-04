const express = require('express');
const router = express.Router();

const {
    books
} = require('../controllers/mypage');

// * POST/mypage/books
router.post("/books", books.post);

// * GET/mypage/books
router.get("/books", books.get);

module.exports = router;