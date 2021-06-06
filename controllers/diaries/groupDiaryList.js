//작성자:김현영
//그룹에서 작성한 공개 다이어리 목록입니다.
//로그인 상태인 경우 내가 속한 그룹의 비공개 일기도 볼 수 있습니다.
const sequelize = require("sequelize")
const { Diary,User,Book,Like,Comment } = require( '../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    //로그인한 유저가 해당 그룹에 속한 사용자일 경우 비공개 일기도 보여줘야 하는데 어떻게 하지?
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userInfo = await User.findOne({ where: { id: data.id } });
    
    const condition = {}

    if(userInfo){   
        condition = { 
            [sequelize.Op.or]:[
                {private: false}, 
                {[sequelize.Op.and]: [{private:true}, {groupId : userInfo.id }]} //비공개이면서 해당 일기의 groupId가 로그인유저가 속한 그룹 목록에 있는 경우
             ]
            }
    }else{
        condition = {private:false} // 유저 정보가 일치하지 않으면 공개 일기만 포함한다.
    }
    
    const groupDiaryList = await Diary.findAll({
        where: {private:false},
        attributes: [
            [sequelize.col("username"), "writer"], //sequelize.col() : Creates an object which represents a column in the DB, this allows referencing another column in your query.
            [sequelize.col("groupId"), "group"], 
            "title",
            "weather",
            "content",
            [sequelize.col("like"), "like"],
            "createdAt",
            "updatedAt"   
        ],
        include: [
            {
                model: User,
                attributes:[],
                include : [
                    {
                        model: Users-groups,
                        attributes: []
                    }
                ]
            },
             {
                model: Book,
                where: { groupId : {[sequelize.Op.ne]: null} },   //그룹일기
                attributes: []
            },
            {
                model: Like,
                required: false,
                attributes: []
            },
            {
                model: Comment,
                required: true,
                attributes: [
                    "userId", // should be changed to [sequelize.col("username"), "username"]
                    "comments"                    
                ],
                order: [ ['createdAt', 'DESC']]
            }
        ],
        order: ["createdAt"]
    })
    res.status(200).json({data: groupDiaryList, message:'공개된 개인 일기의 목록입니다.'})
}