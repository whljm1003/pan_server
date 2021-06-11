const express = require('express');
const router = express.Router();

const {comments} = require('../controllers/comments');


// * POST/comments
router.post("/diaries/:id/comments", comments.post);
// * PUT/comments
router.put("/comments/:id", comments.put);
// * DELETE/comments
router.delete("/commments/:id", comments.delete);

module.exports = router;
