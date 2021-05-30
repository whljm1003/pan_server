//작성자:김현영(get), 문지영(post, delete)
//like가 많은 10개의 공개 다이어리 목록 (개인, 그룹 구분 없음)
const { Diary, User, Like } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
    get: async (req, res) => {
        const trending = await Diary.findAll({
            where: { private: false },
            attributes: [
                [sequelize.col("User.username"), "writer"],
                "type",
                "title",
                "weather",
                "content",
                "private",
                "like",
                "picUrl",
                "date",
                "feelings",
                "createdAt",
                "updatedAt"
            ],
            include: [
                {
                    model: User,
                    required: false,
                    attributes: []
                }
            ],
            order: [['like', 'DESC']],
            limit: 10
        })
        res.status(200).json({ data: trending, message: '좋아요 수가 많은 공개된 일기 목록입니다.' })
    },

    post: async (req, res) => {
        //좋아요 한번 누를 때마다 like count 1씩 증가
        //diaries/:id/trending
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });

        //로그인 한 유저만 좋아요를 누를 수 있음.
        if (!userInfo) {
            res.status(400).json({ message: '로그인 후 이용바랍니다.' });
        }

        //유저가 다이어리에 좋아요를 누르면 기존값 + 1
        const diaryId = req.params.id
        const diary = await Diary.findOne({
            where: { id: diaryId },
            include : {
                model : Like,
                attributes : ['userId']
              }
        })
        // console.log(diaryId) // 1
        console.log("DIARY", diary)
        console.log(Like.dataValues)

        //diaryId를 찾아서 그 다이어리 like에 + 1을 해줘야 됨.
        //그런데 같은 유저가 두 번 이상 못 누르게 해야 함.
        // const like = await Diary.findOne({
        //     where: { id: userInfo}
        // }) // 로그인 유저가 다이어리 1번 id를 이미 클릭했을 경우, 그 다이어리 id를 또 누른다면 like는 삭제되어야 함.
       if(diary){
        Diary.update({
            like: diary.dataValues.like - 1
        },
        { where: { id: diaryId } },
        )
        res.status(200).json({ message: '좋아요가 취소되었습니다. '})
       
       } else {
        Diary.update({
            like: diary.dataValues.like + 1
        },
            { where: { id: diaryId } },
        ) // where 문법은 따로 중괄호에 담아줘야 됨.
        // console.log(diary.dataValues.like) // 0
        res.status(200).json({ message: '좋아요가 등록되었습니다. ' })
            }
        

    },

    // delete: async (req, res) => {

    //     const authorization = req.headers.authorization;
    //     const token = authorization.split(' ')[1];
    //     const data = jwt.verify(token, process.env.ACCESS_SECRET);

    //     const userInfo = await User.findOne({ where: { id: data.id } });

    //     //로그인 한 유저만 좋아요를 취소할 수 있음.
    //     if (!userInfo) {
    //         res.status(400).json({ message: '로그인 후 이용바랍니다.' });
    //     }

    //     //유저가 다이어리에 좋아요를 누르면 기존값 - 1
    //     const diaryId = req.params.id
    //     const diary = await Diary.findOne({
    //         where: { id: diaryId },
    //     })

    //     //diaryId를 찾아서 그 다이어리 like에 - 1을 해줘야 됨.
    //     //그런데 같은 유저가 두 번 이상 못 누르게 해야 함.
    //     Diary.update({
    //         like: diary.dataValues.like - 1
    //     },
    //         { where: { id: diaryId } },
    //     )
    //     res.status(200).json({ message: '좋아요가 취소되었습니다. ' })
    // }
}