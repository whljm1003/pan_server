const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    if (!req.cookies.refreshToken) {
        res.json({ data: null, message: 'refresh token not provided' })
    }
    const accessToken = req.cookies.refreshToken;
    if (accessToken === 'invalidtoken') {
        res.json({ data: null, message: "invalid refresh token, please log in again" })
    }
    const userInfo = jwt.verify(accessToken, process.env.REFRESH_SECRET)
    delete userInfo.iat;

    res.json({ data: { accessToken: accessToken, userInfo }, message: 'ok' })
};
