//작성자:김현영
//내가 속한 그룹일기장의 목록입니다.
const sequelize = require('sequelize')
const { Users_groups, Book } = require('../../models');
const jwt = require('jsonwebtoken')
module.exports = async (req,res) => {

    const authorization = req.headers.authorization;
    if(!authorization){
        res.status(400).json({ message: '로그인 후 이용해주세요.' })
    }else{
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        //내가 속한 그룹의 목록 (즉, 배열을 반환함)
        const myGroupList = await Users_groups.findAll({ 
            where : {userId: data.id},      
        }).then(arr => arr.map(el => el.groupId))
    
        //내 그룹일기장의 목록 (내가 속한 그룹의 id와 일치하는 book의 목록)
        const myGroupBook = await Book.findAll({
            where : {
                groupId: {[sequelize.Op.in]: myGroupList}
            }
        })
    
        res.status(200).json({ data: myGroupBook, message: '일기장 목록입니다.'})
    }

}