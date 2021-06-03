const { User } = require('../../models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require("dotenv").config();

module.exports = async (req, res) => {
    // 요청받은 email과 일치하는 user의 정보
    const userInfo = await User.findOne({ where: { email: req.body.email } });
    // console.log(userInfo)
    // email 존재하지 않으면 400 에러
    if (!userInfo) {
        res.status(400).json({ data: null, message: '존재하지 않는 이메일입니다.' })
    }
    // 요청받은 비밀번호와 해시값으로 저장된 비밀번호를 비교
    const checkPassword = await bcrypt.compare(req.body.password, userInfo.dataValues.password);
    // // 비밀번호가 일치하지 않으면 401 에러
    if (!checkPassword) {
        res.status(401).json({ data: null, message: '비밀번호가 일치하지 않습니다.' })
    }
    // 토큰에 담기 위해 비밀번호를 삭제
    delete userInfo.dataValues.password;

    // jwt.sign(payload, secretKey, options)
    // 일치하는 유저가 있을 경우:
    // 필요한 데이터(id, userId, email, createdAt, updatedAt)를 payload에 담아 JWT token을 생성합니다
    console.log(process.env.ACCESS_SECRET)
    const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET, { expiresIn: "1d" })
    const refreshToken = jwt.sign(userInfo.dataValues, process.env.REFRESH_SECRET, { expiresIn: "3d" })
    
    res.cookie('refreshToken', refreshToken, {  //이름, 값, 옵션 지정
        httpOnly: true,
        secure: true,
        sameSite: 'none' // TypeError: option sameSite is invalid
    }).status(200).json({ data: { accessToken: accessToken }, message: '로그인 되었습니다.' });
    // console.log("REFRESHTOKEN", refreshToken)
};

