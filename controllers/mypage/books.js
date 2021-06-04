//작성자:문지영
const sequelize = require("sequelize");
const { User, Book, Diary, Users_groups, } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
    post: async (req, res) => {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(400).json({ message: '로그인 후 이용해주세요.' })
        }

        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });

        const { bookName, bookCover } = req.body;

        if (!bookName || !bookCover) {
            return res.status(401).json({ message: '일기장 이름을 입력하고 디자인을 선택해주세요.' })
        }

        //개인 일기장 생성(groupdId가 없을 때), 어떤 유저가 생성한 것인지 기록이 되어야 함.
        Book.create({
            bookName: bookName,
            bookCover: bookCover,
        })
        res.status(200).json({ message: '일기장이 생성되었습니다.' })

        //그룹 일기장 생성(groupId가 있을 때), //user가 group에 속해있으면 groupdId가 있음
    },

    get: async (req, res) => {
        //mypage에서 개인 일기장 목록 보기
        //GET/books
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(400).json({ message: '로그인 후 이용해주세요.' })
        }

        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });

        //mypage에서 내가 생성한 일기장 목록 보기(로그인 회원만 볼 수 있음)
        const book = await Book.findAll({
            // where: { id: data.id },
            attributes: ['groupId', 'bookName', 'bookCover', [sequelize.col("bookId"), "bookId"], [sequelize.col("userId"), "userId"]],
            include: [{
                model: Diary,
                // where: { bookId: data.id},
                required: false,
                attributes: [],
                include: [{
                    model: User,
                    where: { id: data.id },
                    attributes: []
                }]
            }],
        });
        console.log(book)

        res.status(200).json({ data: book, message: '개인 일기장 목록입니다.' });
    },

}
