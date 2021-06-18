const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const models = require("./models/index.js");
const userRoutes = require('./routes/users');
const diaryRoutes = require('./routes/diaries');
const mypageRoutes = require('./routes/mypage');
const profileRoutes = require('./routes/profile');
const commentRoutes = require('./routes/comments');
const findIdAndPwdRoutes = require('./routes/findIdAndPwd')

require("dotenv").config();

models.sequelize.sync().then(() => {
    console.log(" DB 연결 성공");
}).catch(err => {
    console.log("연결 실패");
    console.log(err);
})

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["http://localhost:3000", "https://picanote.me", "https://www.picanote.me"],
        credentials: true,
        methods: ["GET", "POST", "DELETE", "PUT"],
    })
);

app.use("/", userRoutes);
app.use("/", diaryRoutes);
app.use("/", mypageRoutes);
app.use("/", profileRoutes);
app.use("/", commentRoutes);
app.use("/", findIdAndPwdRoutes);

const HTTPS_PORT = process.env.HTTPS_PORT || 5000;

let server = app.listen(HTTPS_PORT)

module.exports = server;