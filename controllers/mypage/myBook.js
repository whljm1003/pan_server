//작성자:김현영
//내가 생성한 일기장 목록입니다.
const { Book } = require('../../models');
const jwt = require('jsonwebtoken')
module.exports = async (req,res) => {

    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const myBook = await Book.findAll({ 
        where : {userId: data.id},
        
    })
    res.status(200).json({ data: myBook, message: '일기장 목록입니다.'})
}