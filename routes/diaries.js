const express = require('express');
const router = express.Router();
const { upload } = require("./multer");

const {
    diary,
    diaryList,
    groupDiaryList,
    trending

} = require('../controllers/diaries');

// * POST /diaries/upload
router.post("/diaries/upload", upload.single('img'), async (req, res) => {
    const picUrl = await req.file.location // 이미지 URL 정보가 담긴 곳
    console.log(req.file)
    res.json({ picUrl: picUrl, message: '그림이 등록되었습니다.' })
}); // S3에 이미지 업로드 라우터

// router.post("/diaries/upload", upload.single('img'), async (req, res) => {
//         const picUrl = await req.file.filename
//         console.log(req.file)
//         res.json({ picUrl: picUrl, message: '그림이 등록되었습니다.' })
//     }); // 이미지 업로드 로컬 테스트용

// * POST /diaries
router.post("/diaries", diary.post); // 일기 작성 라우터

// * GET / diaries
router.get("/diaries", diaryList);
// * GET / group diaries
router.get("/group-diaries", groupDiaryList);
// * GET / trending
router.get("/trending", trending);

// * GET /diaries/:id 
router.get("/diaries/:id", diary.get); // 선택한 일기 내용 보여주기

// * PUT /diaries/:id 
router.put("/diaries/:id", diary.put); // 선택한 일기 수정하기

// * DELETE /diaries/:id
router.delete("/diaries/:id", diary.delete) // 선택한 일기 삭제하기

module.exports = router;
