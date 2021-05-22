const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.json({ data: null, message: 'invalid access token' });
    }

    const token = authorization.split(' ')[1];
    const tokenBodyData = jwt.verify(token, process.env.ACCESS_SECRET);
    // console.log(accessToken);
    delete tokenBodyData.iat
    res.json({ data: { userInfo: tokenBodyData }, message: 'ok' })
};