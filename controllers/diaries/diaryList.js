//작성자:김현영
//개인이 작성한 공개 다이어리 목록입니다.
//로그인 상태인 경우 로그인한 사용자의 비밀일기까지 보여줍니다 - 나중에
const sequelize = require("sequelize")
const { Diary,User,Book } = require( '../../models');

module.exports = async (req, res) => {
    const diaryList = await Diary.findAll({
        where: {  private: false, },
        attributes: [
            [sequelize.col("User.username"), "writer"], //sequelize.col() : Creates an object which represents a column in the DB, this allows referencing another column in your query.
            "type",
            "title",
            "weather",
            "content",
            "private",
            "like",
            "picUrl",
            "date",
            "feelings",
            "createdAt",   //고민: Diaries 테이블의 컬럼을 모두 포함하고 User 테이블의 username만 가져올 순 없나
            "updatedAt"   
        ],
        include: [
            {
                model: User,
                required: false,
                attributes:[]   //고민: 위에 attributes를 비우고 여기에 username을 넣으면 Diaries 테이블의 모든 컬럼을 포함하지만 username의 경우 User 컬럼 안에 객체로 들어가게 됨.
            },
             {
                model: Book,
                where: { groupId :null},   //개인일기
                attributes: []
            }
        ],
        order:[ ['createdAt', 'DESC'] ], //The order option takes an array of items to order the query by or a sequelize method. These items are themselves arrays in the form [column, direction].
        limit: 10
        
    })
    res.status(200).json({data: diaryList, message:'공개된 개인 일기의 목록입니다.'})
}
