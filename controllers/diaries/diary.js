//작성자:문지영
const sequelize = require("sequelize");
const { User, Diary, Like } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
    post: async (req, res) => {
        // * POST/diaries
        //글 or 그림 일기 작성하기
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });
        // console.log(userInfo);

        // 아니면 나눌 것이 아니라, form data가 있으면 자동으로 저장되고, 없으면 알아서 null 값으로 저장됨.

        const { type, title, weather, content, private, date, feelings, picUrl, bookId } = req.body;
        //여기서 picUrl은 이미지 업로드 후 picUrl value를 받아온 값을 넣기 때문에 req.body로 요청

        if (!title || !type || !date || !content) {
            return res.status(400).json({ message: '제목, 유형, 날짜, 내용을 입력해주세요.' })
        }

        Diary.create({
            userId: userInfo.dataValues.id, // userId가 없으면 Null로 저장되므로, 어떤 사용자가 작성한지 알기위해 있어야 함.
            bookId: bookId,
            type: type,
            title: title,
            weather: weather,
            content: content,
            // private: private, // 따로 메소드를 만들어야 됨
            picUrl: picUrl, //글 일기일 경우 => NULL로 자동 저장됨
            date: date,
            feelings: feelings,
        })
        res.status(200).json({ message: '일기가 성공적으로 저장되었습니다.' })
    },

    get: async (req, res) => {
        //글 or 그림 일기 보기
        //GET/diaries/:id
        const authorization = req.headers.authorization;
        const diaryId = req.params.id;

        //비로그인 회원도 볼 수 있음, private이 false인 일기만 볼 수 있음, main page용
        if (!authorization) {
            const diary = await Diary.findAll({
                where: { id: diaryId, private: false },
                attributes: ['title', 'weather', 'content', [sequelize.col("like"), "like"], 'date', 'feelings', 'picUrl', 'private', 'userId'],
                include: [{
                    model: Like,
                    required: false,
                    attributes: []
                }]
            });
            res.status(200).json({ data: diary, message: '선택한 일기 내용입니다.' });
        } else {
            //로그인 회원만 볼 수 있음(private이 true, false 상관없이 다 볼 수 있음), mypage용, 단 private=true인건 본인만 볼 수 있게.
            const token = authorization.split(' ')[1];
            const data = jwt.verify(token, process.env.ACCESS_SECRET);

            const diary = await Diary.findAll({
                where: { id: diaryId },
            });

            if (diary[0].dataValues.private === false) {
                const publicDiary = await Diary.findAll({
                    where: { id: diaryId, private: false },
                    attributes: ['title', 'weather', 'content', [sequelize.col("like"), "like"], 'date', 'feelings', 'picUrl', 'private', 'userId'],
                    include: [{
                        model: Like,
                        required: false,
                        attributes: []
                    }]
                });
                res.status(200).json({ data: publicDiary, message: '선택한 일기 내용입니다.' }); //로그인했을 때 private=false일기 보기
            } else if (diary[0].dataValues.private === true) {
                const privateDiary = await Diary.findAll({
                    where: { id: diaryId, userId: data.id },
                    attributes: ['title', 'weather', 'content', [sequelize.col("like"), "like"], 'date', 'feelings', 'picUrl', 'private', 'userId'],
                    include: [{
                        model: Like,
                        required: false,
                        attributes: []
                    }]
                });
                res.status(200).json({ data: privateDiary, message: '선택한 일기 내용입니다.' });//로그인했을 때 private-true인 본인 일기 보기
            }
            //    console.log(diary[0].dataValues.private)
        }
    },

    put: async (req, res) => {
        // 글 or 그림 일기 수정
        //PUT/diaries/:id
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });
        const diaryId = req.params.id;
        const { type, title, weather, content, private, date, feelings, picUrl, bookId } = req.body;

        // //일기에 변경 사항이 없을 경우
        // if (title || type || date || content === Diary.dataValues) {
        //     return res.status(400).json({ message: '변경된 사항이 없습니다. ' })
        // }

        // //항목을 제대로 입력하지 않았을 경우 
        if (!title || !type || !date || !content) {
            return res.status(401).json({ message: '제목, 유형, 날짜, 내용을 입력해주세요.' })
        }

        //수정할 때는 내가 내 일기만 수정할 수 있도록, 내가 다른 사람의 일기를 수정할 수 있게 되면 안됨.
        const diary = await Diary.findOne({
            where: { id: diaryId },
        });
        console.log(diary.dataValues.userId)
        // console.log(userInfo.id) => 6
        // 로그인 한 유저와 일기를 쓴 유저가 다를 경우는 수정할 수 없도록, 즉 나는 남의 일기는 수정할 수 없음.
        if (diary.dataValues.userId !== userInfo.id) {
            return res.status(400).json({ message: '내용을 수정할 수 없습니다. ' })
        }

        // 로그인 한 유저와 일기를 쓴 유저가 같을 경우, 즉 나는 내 일기만 수정할 수 있음.
        else if (diary.dataValues.userId === userInfo.id) {
            Diary.update({
                userId: userInfo.dataValues.id,
                bookId: bookId,
                type: type,
                title: title,
                weather: weather,
                content: content,
                private: private,
                picUrl: picUrl,
                date: date,
                feelings: feelings,
            },
                { where: { id: diaryId } })

            res.status(200).json({ message: '내용이 변경되었습니다.' })
        }
    },

    delete: async (req, res) => {
        //글 or 그림 일기 삭제
        // * DELETE/diaries/:id
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });
        const diaryId = req.params.id;

        // 삭제할 때도 내가 내 일기만 삭제할 수 있도록, 내가 다른 사람의 일기를 삭제하도록 하면 안됨.
        // 로그인 한 유저와 일기를 쓴 유저가 다를 경우는 삭제할 수 없도록, 즉 나는 남의 일기는 삭제할 수 없음.
        const diary = await Diary.findOne({
            where: { id: diaryId },
        });
        if (diary.dataValues.userId !== userInfo.id) {
            return res.status(400).json({ message: '일기를 삭제할 수 없습니다. ' })
        }

        // 로그인 한 유저와 일기를 쓴 유저가 같을 경우, 즉 나는 내 일기만 삭제할 수 있음.
        else if (diary.dataValues.userId === userInfo.id) {
            Diary.destroy({
                where: { id: diaryId }
            })
            res.status(200).json({ message: '일기가 삭제되었습니다.' })
        }
    }
}