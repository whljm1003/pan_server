//작성자:문지영
const sequelize = require("sequelize");
const { User, Book } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
    post: async (req, res) => {
        const authorization = req.headers.authorization;

        if(!authorization){
            return res.status(400).json({ message: '로그인 후 이용해주세요.' })
        }

        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });

        const { groupId, bookName, bookCover } = req.body;

        if (!bookName || !bookCover) {
            return res.status(401).json({ message: '일기잗 이름을 입력하고 디자인을 선택해주세요.' })
        }
        // 로그인 유저가 lala라면,

        Book.create({
            groupId: groupId, // 여기가 문제, user가 group에 속해있으면 groupdId가 있음
            bookName: bookName,
            bookCover: bookCover,
        })
        res.status(200).json({ message: '일기장이 생성되었습니다.' })
    },

}
