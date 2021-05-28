//작성자:김현영
//like가 많은 10개의 공개 다이어리 목록 (개인, 그룹 구분 없음)
const { Diary, User } = require('../../models');

module.exports = async (req, res) =>{
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
        include : [
            {
                model: User,
                required: false,
                attributes: []
            }
        ],
        order: [ ['like', 'DESC']],
        limit : 10
    })
    res.status(200).json({data: trending, message: '좋아요 수가 많은 공개된 일기 목록입니다.'})
}