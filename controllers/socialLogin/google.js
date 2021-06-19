const User = require('../../models')
const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = async (req, res) => {
    const { authorizationCode } = req.body;
    const googleToken = await axios.post("https://oauth2.googleapis.com/token",{
        code: authorizationCode,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        redirect_uri: "https://picanote.me",
        grant_type: "authorization_code",
      }
    );
    const { accessToken } = googleToken.data;
    const googleData = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo/?access_token=${accessToken}`
    );
    const { id, email, picture } = googleData.data;
    const username = email.split('@')[0]
   //google에서 받아온 id로 db에서 유저 정보를 찾는다.
   const existingUser = await User.findOne({where : { socialLoginId : id}});

   await User.findOrCreate({
       where: {
           socialLoginId: id
       },
       defaults: {
           username: username,
           email: email,
           profileUrl: picture
       }
   })
   .then(([newUserObj, isCreated]) => { // findOrCreate 메소드의 반환값으로서 검색/생성된 객체를 포함하는 배열과 불린값을 전달받는다.
       //이미 존재하는 사용자일 경우
       if (!isCreated) {
           //사용자 정보로 토큰을 만든다.
           const rToken = jwt.sign(existingUser.dataValues,process.env.REFRESH_SECRET,{expiresIn: "3d"});
           const aToken = jwt.sign(existingUser.dataValues,process.env.ACCESS_SECRET,{expiresIn: "1d"});
           //refresh token을 쿠키에 담아서 보내고, access token과 사용자 정보는 json 파일로 보낸다.
           res.cookie("refreshToken", rToken, {
               httpOnly: true,
               secure: true,
               maxAge: 1000 * 60 * 60 * 24 * 7,
           })
           .status(200)
           .json({
               data: {
                   accessToken: aToken,
                   userInfo: existingUser
               },
               message: 'access token과 함께 사용자 정보가 전송되었습니다.'
           })
       }else{
           const rToken = jwt.sign(newUserObj,process.env.REFRESH_SECRET,{expiresIn: "3d"});
           const aToken = jwt.sign(newUserObj,process.env.ACCESS_SECRET,{expiresIn: "1d"});

           //refresh token을 쿠키에 담아서 보내고, access token과 사용자 정보는 json 파일로 보낸다.
           res.cookie("refreshToken", rToken, {
               httpOnly: true, //웹 브라우저와 서버 간 통신일 때에만 쿠키를 전송(javascript 등으로 접근을 방지)
               secure: true, //https 프로토콜을 사용할 때에만 전송됨
               maxAge: 1000 * 60 * 60 * 24 * 7,
           })
           .status(200)
           .json({
               data: {
                   accessToken: aToken,
                   userInfo: newUserObj
               },
               message: 'access token과 함께 사용자 정보가 전송되었습니다.'
           })
       }
   })
}