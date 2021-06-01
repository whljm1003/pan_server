//작성자:김현영(get), 문지영(post, delete)
//like가 많은 10개의 공개 다이어리 목록 (개인, 그룹 구분 없음)
const { Diary, User, Like } = require('../../models');
const sequelize = require("sequelize")
const jwt = require('jsonwebtoken');

module.exports = {
    get: async (req, res) => {
        const trending = await Diary.findAll({
            where: { private: false },
            attributes: [
                [sequelize.col("username"), "writer"],
                "type",
                "title",
                "weather",
                "content",
                "private",
                "picUrl",
                "date",
                "feelings",
                [sequelize.col("like"), "like"],
                "createdAt",
                "updatedAt"
            ],
            include: [
                {
                    model: User,
                    required: false,
                    attributes: [],
                },
                {
                    model: Like,
                    required: false,
                    attributes: []
                }
            ],
            order: [[sequelize.col("like"), 'DESC']],
        })
        res.status(200).json({ data: trending, message: '좋아요 수가 많은 공개된 일기 목록입니다.' })
    },

    post: async (req, res) => {
        //좋아요 한번 누를 때마다 like count 1씩 증가
        //diaries/:id/trending
        const authorization = req.headers.authorization;

        //로그인 한 유저만 좋아요를 누를 수 있음.
        // console.log(req.headers)
        if (!authorization) {
            res.status(400).json({ message: '로그인 후 이용바랍니다.' });
        }

        //diaryId를 찾아서 그 다이어리 like에 + 1을 해줘야 됨.
        const diaryId = req.params.id
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const like = await Like.findOne({
            where: { userId: data.id, diaryId: diaryId }
        }) //Likes 테이블에 로그인 한 유저의 좋아요가 있는지 찾음.

        // console.log(like)

        //해당 유저가 이미 like를 누른 경우는 해당 데이터 전체 삭제
        if (like) {
            Like.destroy(
                { where: { userId: data.id, diaryId: diaryId } },// where 문법은 따로 중괄호에 담아줘야 됨.
            )
            res.status(200).json({ message: '좋아요가 취소되었습니다.' })

        }
        //like를 처음 누른 경우는 like.dataValues값이 존재하지 않기 때문에(null), 값은 그냥 1이 되게 하면 됨.
        else {
            Like.create({
                userId: data.id,
                diaryId: diaryId,
                like: 1
            },
            )
            res.status(200).json({ message: '좋아요가 등록되었습니다.' })
        }
    },
}