const express = require('express');
const router = express.Router();

const {
    books,
    myBook,
    myGroupBook
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
router.get("/myGroupBook", myGroupBook)

module.exports = router;