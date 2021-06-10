//작성자:김현영
const jwt = require('jsonwebtoken');
const { User } = require ('../../models');
const bcrypt = require('bcrypt');


module.exports = {
    get: async (req, res) => {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        
        const profile = await User.findOne({
            where: { id: data.id},
        })
        //delete profile.dataValues.password
        res.status(200).json({data: profile, message: '사용자 프로필입니다.'})

    },

    put: async (req, res) => {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const { username, password, profileUrl } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);

        if(!username || !password){
            res.status(200).json({message: '사용자명과 패스워드는 필수 입력사항입니다.'})
        }else{
            User.update({
                username,
                password : encryptedPassword,
                profileUrl
            }, {
                where: {id: data.id}
            })
            res.status(200).json({message: '사용자 정보가 수정되었습니다.'})
        }
    }
}