const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const models = require("./models/index.js");

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
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "OPTIONS"],
    })
);


const HTTPS_PORT = process.env.HTTPS_PORT || 8080;

    server = app.listen(HTTPS_PORT)

module.exports = server;