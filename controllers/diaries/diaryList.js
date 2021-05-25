//작성자:김현영
//개인이 작성한 공개 다이어리 목록입니다.
//로그인 상태인 경우 로그인한 사용자의 비밀일기까지 보여줍니다 - 나중에

const { Diary } = require( '../../models');

module.exports = async (req, res) => {
    const diaryList = await Diary.findAll({
        where: { private: false }, //즉, 비공개가 아닌 것
        order: ['updatedAt'],
        limit: 10
    })
    res.status(200).json({data: diaryList, message:'공개된 개인 일기의 목록입니다.'})
}