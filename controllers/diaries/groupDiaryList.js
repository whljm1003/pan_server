//작성자:김현영
//그룹에서 작성한 공개 다이어리 목록입니다.
//로그인 상태인 경우 내가 속한 그룹의 비공개 일기도 볼 수 있습니다.
const sequelize = require("sequelize")
const { Diary,User,Book } = require( '../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userInfo = await User.findOne({ where: { id: data.id } });

    const condition = {}
    if(userInfo){   //유저 정보가 있으면
        condition = { 
            [sequelize.Op.or]:[
                {private: false}, //공개 일기이거나 
                {[sequelize.Op.and]: [{private:true}, {userId : userInfo.id }]} // 비공개일기지만 유저 아이디가 일치하는 일기를 condition에 값으로 넣는다.
             ]
            }
    }
    condition = {private:false} // 유저 정보가 일치하지 않으면 공개 일기만 포함한다.

    const groupDiaryList = await Diary.findAll({
        where: condition,
        attributes: [
            [sequelize.col("User.username"), "writer"], //sequelize.col() : Creates an object which represents a column in the DB, this allows referencing another column in your query.
            "title",
            "weather",
            "content",
            "createdAt",
            "updatedAt"   
        ],
        include: [
            {
                model: User,
                attributes:[]
            },
             {
                model: Book,
                where: { groupId : {[sequelize.Op.ne]: null} },   //그룹일기
                attributes: []
            }
        ],
        limit: 10,
        order: ["createdAt"]
    })
    res.status(200).json({data: groupDiaryList, message:'공개된 개인 일기의 목록입니다.'})
}