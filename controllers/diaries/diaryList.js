//작성자:김현영
//메인페이지에 활용할 개인이 작성한 공개 다이어리 목록입니다.
const sequelize = require("sequelize")
const { Diary,User,Book,Like,Comment } = require( '../../models');

module.exports = async (req, res) => {

    const diaryList = await Diary.findAll({
        where: { private:false },

        attributes: [
            "id",
            "userId",
            [sequelize.col("User.username"), "username"], //sequelize.col() : Creates an object which represents a column in the DB, this allows referencing another column in your query.
            "bookId",   
            [sequelize.col("groupId"), "groupId"],
            "type",
            "title",
            "weather",
            "content",
            "private",
            "picUrl",
            "date",
            "feelings",
            [sequelize.col("like"), "like"],
            "createdAt",   //고민: Diaries 테이블의 컬럼을 모두 포함하고 User 테이블의 username만 가져올 순 없나
            "updatedAt"   
        ],
        include: [
            {
                model: Book,
                where: { groupId : {[sequelize.Op.is]: null,} },    //include절이 where절을 포함할 경우 required는 true가 된다.(즉, inner join이 되므로 groupId가 null인 다이어리 목록만 필터링한다.)
                attributes: []
            },
            {
                model: User,
                attributes:[]  
            },

            {
                model: Like,
                attributes: []
            },
            {
                model: Comment,
                // include:[
                //     {
                //         model: User,
                //         attributes:[]  
                //     },
                // ],
    
                order: [ ['createdAt', 'DESC']]
            }
        ],
        order:[ ['createdAt', 'DESC'] ], //The order option takes an array of items to order the query by or a sequelize method. These items are themselves arrays in the form [column, direction].
        
   })
    res.status(200).json({data: diaryList, message:'공개된 개인 일기의 목록입니다.'})
}
