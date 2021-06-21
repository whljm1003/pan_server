const express = require('express');
const router = express.Router();
const { profileUpload } = require("./multer");
const {profile} = require('../controllers/profile');
// * GET/profile
router.get("/profile", profile.get);
// * PUT/profile
router.put("/profile", profile.put);

// * PUT /profile/upload
router.put("/profile/upload", profileUpload.single('img'), async (req, res) => {
    const profileUrl = await req.file.location // 이미지 URL 정보가 담긴 곳
    console.log(req.file)
    res.json({ profileUrl: profileUrl, message: '프로필 사진이 등록되었습니다.' })
}); // S3에 이미지 업로드 라우터

module.exports = router;
