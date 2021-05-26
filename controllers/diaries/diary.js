//작성자:문지영
const { User, Diary } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
    post: async (req, res) => {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });
        // console.log(userInfo);

        // form data가 있을 경우 => Form data picUrl을 같이 저장
        // form data가 없을 경우 => req.body만 저장
        // 아니면 나눌 것이 아니라, form data가 있으면 자동으로 저장되고, 없으면 알아서 null 값으로 저장

        const { type, title, weather, content, private, date, feelings, picUrl } = req.body;
        //여기서 picUrl은 이미지 업로드 후 picUrl value를 받아온 값을 넣기 때문에 req.body로 요청

        if (!title || !type || !date || !content) {
            return res.status(400).json({ message: '제목, 유형, 날짜, 내용을 입력해주세요.' })
        }

        Diary.create({
            userId: userInfo.dataValues.id, // userId가 없으면 Null로 저장되므로, 어떤 사용자가 작성한지 알기위해 있어야 함.
            type: type,
            title: title,
            weather: weather,
            content: content,
            private: private,
            picUrl: picUrl, //글 일기일 경우 => NULL로 자동 저장됨
            date: date,
            feelings: feelings,
        })
        res.status(200).json({ message: '일기가 성공적으로 저장되었습니다.' })
    },
}