//작성자:문지영
const { Diary } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
    post: async (req, res) => {
        //특정 다이어리 옆 버튼을 클릭하면 비공개 또는 공개로 전환(private: true or false)
        //db에는 false가 0, true가 1로 저장됨
        //diaries/:id/private
        const authorization = req.headers.authorization;

        //로그인 한 유저만 비공개, 공개 설장할 수 있음.
        if (!authorization) {
            res.status(400).json({ message: '로그인 후 이용바랍니다.' });
        }

        const diaryId = req.params.id
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const diary = await Diary.findOne({
            where: { userId: data.id, id: diaryId }
        }) // Diary 테이블에 로그인한 유저가 선택한 일기를 찾음.

        //defaultValue가 true이므로, 클릭을 하면 false(공개)로 전환
        if (diary.dataValues.private === true) {
            Diary.update({
                private: false
            },
                { where: { userId: data.id, id: diaryId } }
            )
            res.status(200).json({ message: '선택한 일기가 공개로 전환되었습니다.' })
        }

        //다시 클릭하면 true(비공개)로 전환
        else if (diary.dataValues.private === false) {
            Diary.update({
                private: true
            },
                { where: { userId: data.id, id: diaryId } }
            )
            res.status(201).json({ message: '선택한 일기가 비공개로 전환되었습니다.' })
        }
        // console.log(diary)
    },
}
