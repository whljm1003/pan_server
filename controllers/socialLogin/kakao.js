const axios = require("axios");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) => {
    const { authorizationCode } = req.body;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const kakaoToken = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=https://www.picanote.me&code=${authorizationCode}`)
    const { accessToken } = kakaoToken.data;
    const kakaoUserInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${ accessToken }`
        }
    });

    //kakao에서 받아온 사용자정보 중 id, email, nickname, thumbnail_image_url을 변수에 담는다.
    const {
        id,
        kakao_account: {
            profile: {
                nickname,
                thumbnail_image_url
            },
            email
        },
    } = kakaoUserInfo.data;

    //kakao에서 받아온 id로 db에서 유저 정보를 찾는다.
    const existingUser = await User.findOne({where : { socialLoginId : id}});

    await User.findOrCreate({
        where: {
            socialLoginId: id
        },
        defaults: {
            username: nickname,
            email: email,
            profileUrl: thumbnail_image_url
        }
    })
        .then(([newUserObj, isCreated]) => { // findOrCreate 메소드의 반환값으로서 검색/생성된 객체를 포함하는 배열과 불린값을 전달받는다.
            //이미 존재하는 사용자일 경우
            if (!isCreated) {
                //사용자 정보로 토큰을 만든다.
                const rToken = jwt.sign({
                    id: existingUser.id,
                    username: existingUser.username,
                    email: existingUser.email,
                    socialLoginId: existingUser.socialLoginId,
                },process.env.REFRESH_SECRET,
                {
                    expiresIn: "3d"
                });
                const aToken = jwt.sign({
                    id: existingUser.id,
                    username: existingUser.username,
                    email: existingUser.email,
                    socialLoginId: existingUser.socialLoginId,
                },process.env.ACCESS_SECRET,
                {
                    expiresIn: "1d"
                });
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
                const rToken = jwt.sign({
                    id: newUserObj.id,
                    username: newUserObj.username,
                    email: newUserObj.email,
                    socialLoginId: newUserObj.socialLoginId,
                },process.env.REFRESH_SECRET,
                {
                    expiresIn: "3d"
                });
                const aToken = jwt.sign({
                    id: newUserObj.id,
                    username: newUserObj.username,
                    email: newUserObj.email,
                    socialLoginId: newUserObj.socialLoginId,
                },process.env.ACCESS_SECRET,
                {
                    expiresIn: "1d"
                });

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
                        userInfo: newUserObj
                    },
                    message: 'access token과 함께 사용자 정보가 전송되었습니다.'
                })
            }
        })
}