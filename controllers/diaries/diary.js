//작성자:문지영
const { User, Diary } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
    post: async (req, res) => {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });
        console.log(userInfo);
        const { type, title, weather, content, private, picUrl, date, feelings } = req.body;

        if (!title || !type || !date || !content) {
            return res.status(401).json({ message: '제목, 유형, 날짜, 내용을 입력해주세요.' })
        }

        Diary.create({
            userId: userInfo.dataValues.id, // userId가 없으면 Null로 저장되므로, 어떤 사용자가 작성한지 알기위해 있어야 함.
            type: type,
            title: title,
            weather: weather,
            content: content,
            private: private,
            picUrl: picUrl,
            date: date,
            feelings: feelings,
        })
        res.status(200).json({ message: '일기가 성공적으로 저장되었습니다.' })
        // users - diaries
        // pictureImg // Form Data Parameters => 프론트에서 업로드한 이미지 url을 db에 저장하기
        // weather // 그림?
        // title 
        // type // 글 or 그림일기
        // feelings // 그림
        // date
        // content
        //401 제목,날짜,내용을 정확히 입력해주세요.
    }
}