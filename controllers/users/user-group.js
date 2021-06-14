//작성자:문지영
const { User, Users_groups } = require('../../models');
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
    sendMail: async (req, res) => {
        // 그룹 생성
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        // const userInfo = await User.findOne({ where: { id: data.id } });
        // 1.로그인한 유저가 그룹일기장을 만들 때 먼저 그룹 만들기 클릭 => 그룹일기장의 id, userId, groupId, bookName, bookCover + 로그인 유저 id(owner)를 가져와서 그룹 일기장 생성
        // 1번은 books.js로 가야하나?

        // 2.회원 중에서 초대하고 싶은 유저 선택(최대 2명) => 그룹 생성하기 버튼 클릭 (owner가 포함된 group이 일단 만들어지는 것과 메일 발송이 동시에)
        const { id, email, groupId } = req.body
        const inviteToken = jwt.sign({ id, email, groupId }, process.env.ACCESS_SECRET, { expiresIn: '20m' }) // token 생성, 여기서 token을 저장해놓을 곳이 필요할듯??
        // const userInfo = await User.findOne({ where: { email: email }})
        // Users_groups.create({
        //     UserId: userInfo.dataValues.id,
        //     GroupId: groupId

        // })
        // console.log(userInfo)
        // .then((user) => {
        //     const data = { // 데이터 정리
        //     //   inviteToken,
        //      id: user.id, // req.body.email과 일치하는 유저의 id가 들어가야 함
        //     //   groupId:
        //       ttl: 300 // ttl 값 설정 (5분)
        //     };
        //     Users_groups.create(data); // Users_groups 테이블에 데이터 입력
        //   })

        // 3.선택한 유저들에게 초대 메일 발송 & 메일에 들어갈 링크에 대한 암호화
        async function main() {
            // Generate test SMTP service account from ethereal.email
            // create reusable transporter object using the default SMTP transport
            const { email } = req.body
            const transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "44dbe1cbc3bed6",
                    pass: "590788b48efe75",
                },
            });

            // const transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     host: 'smtp.gmail.com',
            //     port: 587,
            //     secure: false,
            //     auth: {
            //       user: process.env.NODEMAILER_USER,
            //       pass: process.env.NODEMAILER_PASS
            //     }
            //   });

            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: "groupdiary@picanote.com", // picanote에서 발송 // `"WDMA Team" <${process.env.NODEMAILER_USER}>`
                to: `${email}`, // 초대하려고 선택한 유저의 이메일
                subject: "PicaNote 그룹일기 초대 메일입니다.", // Subject line
                // text: `${userInfo.dataValues.username}` + "님이 Picanote그룹일기로 초대하셨습니다. 아래 링크를 누르면 그룹으로 초대됩니다.", // 로그인한 유저의 이름으로 초대메세지가 입력됨
                html: "<p>아래 링크를 누르면 그룹으로 초대됩니다.</p>" + `http://localhost:80/invite/?token=${inviteToken}` // html body,  <a href='http://localhost:3000/invite/?email=" + email + "&token=abcdefg'>그룹초대</a>, `http://localhost:3000/invite/?token=${token}`
            });

            //console.log(userInfo)
            console.log(info)
            res.status(200).json({ message: '그룹 초대 메일이 발송되었습니다.' })
        }

        main().catch(console.error);

        // 4.메일을 받은 유저가 메일 내 링크를 클릭하면 => 해당 토큰이 서버에 받아지고, users_groups에 해당 userId가 자동으로 저장됨?
        // http://localhost/invite/?email=abigail90@naver.com,%20%20kimcoding@gmail.com&token=abcdefg


        // 링크 누르면 바로 토큰 받아서 처리하도록
        // 라우트 만들어서 /invite?token=____
        // 토큰에 이메일 암호화해서
        // sha256(초대할 사람의 id, secret key, groupID)
        // token = sha256(초대할 사람의 id, secret key, groupID)

    },

    createGroup: async (req, res) => {
        const { email, groupId } = req.body
        // const token = req.query.params
        const userInfo = await User.findOne({ where: { email: email } }) // kimcoding이면 kimcoding메일을 req.body로 다시 요청해야하나? token을 따로 보관해놓아야 하나?
        //token 정보를 기억하고 있어야 할듯??
        Users_groups.create({
            UserId: userInfo.dataValues.id,
            GroupId: groupId // groupId는 언제 생성되는 것인지?
        })
        res.status(201).json({ message: '그룹에 초대되었습니다.' })
    }
}