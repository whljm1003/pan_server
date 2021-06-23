//작성자:김현영
//그룹에서 작성한 공개 다이어리 목록입니다.
const sequelize = require("sequelize")
const { Diary,User,Book,Like,Comment} = require( '../../models');


module.exports = async (req, res) => {
   
    const groupDiaryList = await Diary.findAll({
        where: { private:false },
        attributes: [
            "id",
            "userId",
            [sequelize.col("User.username"), "username"], //sequelize.col() : Creates an object which represents a column in the DB, this allows referencing another column in your query.
            "bookId", 
            [sequelize.col("groupId"), "groupId"],
            [sequelize.col("bookCover"), "bookCover"],
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
                attributes:[],
            },
             {
                model: Book,
                where: { groupId : {[sequelize.Op.not]: null,} },   //그룹일기
                attributes: []
            },
            {
                model: Like,
                include: [{
                    model: User,
                    attributes: ["username"]
                }],
            },
            {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ["username"]
                }],
                order: [ ['createdAt', 'DESC']]
            }
        ],
        order:[ ['createdAt', 'DESC'] ],
    })
    res.status(200).json({data: groupDiaryList, message:'공개된 그룹 일기의 목록입니다.'})
}

    // const authorization = req.headers.authorization;
    // var condition = {}
    // //로그인 상태가 아닐 경우
    // if(!authorization){
    //     condition = {private:false}
    // }else{ //로그인한 경우
    //     const token = authorization.split(' ')[1];
    //     const data = jwt.verify(token, process.env.ACCESS_SECRET);
    //     const userInfo = await User.findOne({
    //         where: {id: data.id}
    //     })
    //     //로그인한 유저가 속한 그룹의 목록을 배열에 담는다.
    //     const myGroupList = await Users_groups.findAll({
    //         where: {userId:data.id}
    //     }).then(arr => arr.map(el => el.groupId))
    //    // console.log(myGroupList);

    //     //로그인한 유저가 권한을 가지는 일기장의 목록을 배열에 담는다.
    //     const bookList = await Book.findAll({
    //     where: {[sequelize.Op.or]: [
    //         {userId : data.id }, // 내가 생성한 일기장이거나
    //         {groupId : {[sequelize.Op.in]: myGroupList}} // 내가 속한 그룹이 생성한 일기장이거나
    //     ]}
        
    //     }) // 조건에 맞는 book 테이블 레코드를 필터링한다
    //     .then(arr => arr.map(el => el.id)) // 그 중 bookId만 배열에 담는다.

    //     console.log(myGroupList);
    //     console.log(bookList)
    //     if(userInfo){   
    //         condition = { 
    //             [sequelize.Op.or]:[
    //                 {private: false}, 
    //                 {[sequelize.Op.and]: [{private:true}, {bookId: {[sequelize.Op.in]:bookList}}]} //비공개이면서 해당 일기의 groupId가 로그인유저가 속한 그룹 목록에 있는 경우
    //              ]
    //             }
    //     }else{
    //         condition = {private:false} // 유저 정보가 일치하지 않으면 공개 일기만 포함한다.
    //     }
    // }