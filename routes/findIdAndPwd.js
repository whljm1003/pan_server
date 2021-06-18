const express = require('express');
const router = express.Router();

const{
    findPwd
} = require('../controllers/findIdAndPwd');

// *POST/findPwd
router.post("/findPwd", findPwd.findPwd);
// *POST/resetPwd
router.post("/resetPwd", findPwd.resetPwd);

module.exports = router;