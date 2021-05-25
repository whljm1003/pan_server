//작성자:김현영
const { User } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {  

    /* 회원탈퇴 요청을 받았을 때
        -요청 헤더에 담긴 토큰이 유효하지 않으면 에러메세지를 전송한다.
        -요청 헤더에 담긴 토큰이 유효하면 토큰에 담긴 사용자id를 db에서 삭제하고 쿠키와 헤더에 담긴 내용도 삭제한다.
            (요청의 authorization은 <type>+<credentials>로 구성되어 있는데 이 credentials에서는 사용자명과 비밀번호가 콜론을 이용하여 합쳐진다.)
    */

    const auth = req.headers.authorization; // 토큰은 요청의 헤더에 담겨져 전송된다. authorization : <typ><credential>
    if(auth === undefined){
        res.status(401).send('권한이 유효하지 않습니다.')
    }
    const token = auth.split(' ')[1]    // 헤더의 authorization에는 bearer 이라고 타입이 포함되어 있으므로 split 해서 사용해야 한다. (jwt, Oauth의 경우 타입으로 Bearer을 사용한다.)
    const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET);
    const { id } = verifiedToken;

    await User.destroy({
        where: { id }
    });
    res.clearCookie('refreshToken');
    req.header.authorization = null;
    res.status(200).send('회원탈퇴가 정상적으로 처리되었습니다.')

}