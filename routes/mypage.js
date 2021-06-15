const express = require('express');
const router = express.Router();

const {
    books,
    myBook,
    myGroupBook,
    private
} = require('../controllers/mypage');

// * POST/mypage/books
router.post("/books", books.post);

// * GET/mypage/books
router.get("/books", books.get);

// * PUT/mypage/books/:id
router.put("/books/:id", books.put);

// * DELETE/mypage/books/:id
router.delete("/books/:id", books.delete);

// * GET/myBook
router.get("/myBook", myBook);

// * GET/mygroupBook
router.get("/myGroupBook", myGroupBook);

// * POST/diaries/:id/private
router.post("/diaries/:id/private", private.post); // 선택한 일기 공개,비공개 전환

module.exports = router;