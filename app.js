const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const models = require("./models/index.js");
const userRoutes = require('./routes/users');
const diaryRoutes = require('./routes/diaries');

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
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
    })
);

app.use("/", userRoutes);
app.use("/", diaryRoutes);

const HTTPS_PORT = process.env.HTTPS_PORT || 80;

let server = app.listen(HTTPS_PORT)

module.exports = server;