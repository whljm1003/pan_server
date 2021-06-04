//작성자:문지영
const sequelize = require("sequelize");
const { User, Book, Diary, Like } = require('../../models');
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
        console.log(userInfo);

        const { bookName, bookCover } = req.body;

        if (!bookName || !bookCover) {
            return res.status(401).json({ message: '일기장 이름을 입력하고 디자인을 선택해주세요.' })
        }

        //개인 일기장 생성(groupdId가 없을 때), 어떤 유저가 생성한 것인지 기록이 되어야 함.
        Book.create({
            userId: userInfo.dataValues.id,
            bookName: bookName,
            bookCover: bookCover,
        })
        res.status(200).json({ message: '개인 일기장이 생성되었습니다.' })

        //그룹 일기장 생성(groupId가 있을 때), //user가 group에 속해있으면 groupdId가 있음
    },

    get: async (req, res) => {
        // mypage에서 개인 일기장 목록 보기
        // GET/books
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(400).json({ message: '로그인 후 이용해주세요.' })
        }

        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        //mypage에서 내가 생성한 개인일기장 목록 보기(로그인 회원만 볼 수 있음)
        const book = await Book.findAll({
            where: { userId: data.id },
            attributes: ['userId', 'groupId', 'bookName', 'bookCover'],
            include: [{
                model: Diary,
                required: false,
                attributes: ['userId', 'bookId', 'type', 'title', 'weather', 'content', 'private', 'picUrl', 'date', 'feelings'],
                include: [{
                    model: Like,
                    required: false,
                    attributes: ['like']
                }]
            }]
        });
        res.status(200).json({ data: book, message: '개인 일기장 및 일기 목록입니다.' });
    },

    put: async (req, res) => {
        // 개인 일기장 수정
        // PUT/books/:id
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });
        const bookId = req.params.id;
        const { bookName, bookCover } = req.body;

        // 항목을 제대로 입력하지 않았을 경우 
        if (!bookName || !bookCover) {
            return res.status(401).json({ message: '일기장 이름을 입력하고 일기장 디자인을 선택해주세요.' })
        }

        //수정할 때는 내가 내 일기장만 수정할 수 있도록, 내가 다른 사람의 일기장를 수정할 수 있게 되면 안됨.
        const book = await Book.findOne({
            where: { id: bookId },
        });
        console.log(book.dataValues)

        // 로그인 한 유저와 일기장을 만든 유저가 다를 경우는 수정할 수 없도록, 즉 나는 남의 일기장은 수정할 수 없음.
        if (book.dataValues.userId !== userInfo.id) {
            return res.status(402).json({ message: '내용을 수정할 수 없습니다. ' })
        }

        // 로그인 한 유저와 일기를 쓴 유저가 같을 경우, 즉 나는 내 일기만 수정할 수 있음.
        else if (book.dataValues.userId === userInfo.id) {
            Book.update({
                userId: userInfo.dataValues.id,
                bookName: bookName,
                bookCover: bookCover,
            },
                { where: { id: bookId } })

            res.status(200).json({ message: '내용이 변경되었습니다.' })
        }
    },
    delete: async (req, res) => {
        // 개인 일기장 삭제
        // * DELETE/books/:id
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });
        const bookId = req.params.id;

        // 삭제할 때도 내가 내 일기만 삭제할 수 있도록, 내가 다른 사람의 일기를 삭제하도록 하면 안됨.
        // 로그인 한 유저와 일기를 쓴 유저가 다를 경우는 삭제할 수 없도록, 즉 나는 남의 일기는 삭제할 수 없음.
        const book = await Book.findOne({
            where: { id: bookId },
        });
        if (book.dataValues.userId !== userInfo.id) {
            return res.status(400).json({ message: '일기장을 삭제할 수 없습니다. ' })
        }

        // 로그인 한 유저와 일기를 쓴 유저가 같을 경우, 즉 나는 내 일기만 삭제할 수 있음.
        else if (book.dataValues.userId === userInfo.id) {
            Book.destroy({
                where: { id: bookId }
            })
            res.status(200).json({ message: '일기장이 삭제되었습니다.' })
        }
    }
}
