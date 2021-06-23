//작성자:김현영
const axios = require("axios");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
//kakao로 로그인 회원 정보가 db에 있으면 (socialLoginId의 값이 일치하면) 로그인에 성공하고, 그렇지 않으면 db에 회원 정보를 저장한다.
module.exports = async (req, res) => {
    const { authorizationCode } = req.body;
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    // const kakaoToken = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=https://www.picanote.me&code=${authorizationCode}`)

    const kakaoToken = await axios.post("https://www.picanote.me", {
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
        grant_type: "authorization_code",
        redirect_uri: "https://picanote.me/kakao"
    })
    //   .then(response => {
    //     // console.log("RESPONSE", response);
    //     const {access_token} = response.data
    //     res.status(200).json({ accessToken: access_token });
    //   }
    //   )
    //   .catch(err => err);

    const { accessToken } = kakaoToken.data;
    const kakaoUserInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`
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
    const existingUser = await User.findOne({ where: { socialLoginId: id } });

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
                const rToken = jwt.sign(existingUser.dataValues, process.env.REFRESH_SECRET, { expiresIn: "3d" });
                const aToken = jwt.sign(existingUser.dataValues, process.env.ACCESS_SECRET, { expiresIn: "1d" });
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
            } else {
                const rToken = jwt.sign(newUserObj, process.env.REFRESH_SECRET, { expiresIn: "3d" });
                const aToken = jwt.sign(newUserObj, process.env.ACCESS_SECRET, { expiresIn: "1d" });

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