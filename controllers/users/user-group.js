//작성자:문지영
const { User, Group, Users_groups } = require('../../models');
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const accessToken = require('./accessToken');
const {google} = require('googleapis')
require("dotenv").config();

module.exports = {
    sendMail: async (req, res) => {
        // 그룹 생성
        // 그룹 일기장 만들기를 누르면, 그룹을 생성하고 그룹원에게 초대 메일이 발송됨.
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        // 1.로그인한 유저가 그룹일기장을 만들 때 먼저 그룹 만들기 클릭 
        // 2.회원 중에서 초대하고 싶은 유저 선택(최대 2명) => 그룹 생성하기 버튼 클릭 => owner가 포함된 group이 만들어지는 것과 동시에 메일이 발송됨.
        const { email, groupName } = req.body;

        //그룹 생성. owner는 그룹을 생성한 사람
        const groupInfo = await Group.create({
            groupName: groupName,
            owner: data.id
        }) // 여기서 groupdId가 생성됨.
        console.log(groupInfo)

        // 초대하려는 유저 정보를 db에서 찾음(id랑 email정보만)
        const userInfo = await User.findAll({
            where: { email: email },
            attributes: ['id', 'email']
        })

        console.log('USERINFO', userInfo)
        const groupId = groupInfo.dataValues.id // email 초대하려는 group의 id, 위에서 그룹 만들 때 생성된 id.

        // 그룹 초대할 사람이 1명일 때
        if (email.length === 1) {
            console.log('한명일 때')
            const arr = []
            const email1 = email[0]
            const userInfo1 = await User.findOne({ where: { email: email1 } })
            // 회원가입된 이메일이 아닐 때
            if (userInfo1 === null) {
                arr.push(email1)
                return res.status(400).json({ message: `${arr[0]}의 이메일이 유효하지 않습니다.` })
            }

            // 회원가입된 유저라면 토큰 생성 후 초대메일 발송
            const userId = userInfo[0].id // email 초대하려는 사람의 userId(가입된 유저들만 초대 가능).
            const inviteTokenFirst = jwt.sign({ userId, email: email1, groupId }, process.env.ACCESS_SECRET, { expiresIn: '20m' }) // 초대하려는 사람의 userId, email, groupId 정보가 담긴 토큰 생성.
            const inviteDataFirst = jwt.verify(inviteTokenFirst, process.env.ACCESS_SECRET)
            console.log("inviteData", inviteDataFirst)

            async function main() {
                // 3.선택한 유저들에게 초대 메일 발송
                // 테스트용(mailtrap.io, 실제 전송은 안됨)
                // create reusable transporter object using the default SMTP transport
                const { email } = req.body
                const transporter = await nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: "44dbe1cbc3bed6",
                        pass: "590788b48efe75",
                    },
                });
                // gmail smtp이용(실제 전송 됨)
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
                const url = `https://api.picanote.me/invite/?token=${inviteTokenFirst}`
                //배포 클라이언트 주소로 바꾸기

                // 메일 발신자, 수신자 및 메일 내용 정의(그룹 초대 링크 포함)
                const info = await transporter.sendMail({
                    from: process.env.NODEMAILER_USER, // picanote에서 발송 // `"WDMA Team" <${process.env.NODEMAILER_USER}>`
                    to: `${email[0]}`, // 초대하려고 선택한 유저의 이메일
                    subject: "PicaNote 그룹일기 초대 메일입니다.", // Subject line
                    // text: `${userInfo.dataValues.username}` + "님이 Picanote그룹일기로 초대하셨습니다. 아래 링크를 누르면 그룹으로 초대됩니다." + `http://localhost:5000/invite/?token=${inviteToken}`, // 로그인한 유저의 이름으로 초대메세지가 입력됨
                    html: "<p>아래 링크를 누르면 그룹으로 초대됩니다.</p>" + "<a href=" + url + ">초대링크</a>"
                }); // 4.메일을 받은 유저가 메일 내 링크를 클릭하면 => 해당 토큰이 서버에 받아지고, users_groups에 해당 userId 및 groupId가 자동으로 저장됨

                console.log(info)
                // console.log("inviteData", inviteData)

                return res.status(200).json({ groupInfo: groupInfo.dataValues, message: '그룹 초대 메일이 발송되었습니다.' })

            }
            main() //이메일 발송 함수 실행
        }

        // 그룹 초대할 사람이 2명일 때
        if (email.length === 2) {
            console.log("두명일 때")
            const arr = []
            const email1 = email[0]
            const email2 = email[1]

            const userInfo1 = await User.findOne({ where: { email: email1 } })
            const userInfo2 = await User.findOne({ where: { email: email2 } })

            //회원가입된 이메일이 아닐 때
            if (userInfo1 === null) {
                arr.push(email1)
                return res.status(401).json({ message: `${arr[0]}의 이메일이 유효하지 않습니다.` })
                //main().catch('err')
            } else if (userInfo2 === null) {
                arr.push(email2)
                return res.status(401).json({ message: `${arr[0]}의 이메일이 유효하지 않습니다.` })
            }

            // 회원가입된 유저라면 토큰 생성 후 초대메일 발송
            //req.body의 첫번째 이메일 유저에 대한 토큰 생성
            const userId1 = userInfo[0].id
            const inviteTokenFirst = jwt.sign({ userId: userId1, email: email1, groupId }, process.env.ACCESS_SECRET, { expiresIn: '20m' }) // 초대하려는 사람의 userId, email, groupId 정보가 담긴 토큰 생성.
            const inviteDataFirst = jwt.verify(inviteTokenFirst, process.env.ACCESS_SECRET)
            console.log("inviteDataFirst", inviteDataFirst)

            //req.body의 두번째 이메일 유저에 대한 토큰 생성
            const userId2 = userInfo[1].id
            const inviteTokenSecond = jwt.sign({ userId: userId2, email: email2, groupId }, process.env.ACCESS_SECRET, { expiresIn: '20m' })
            const inviteDataSecond = jwt.verify(inviteTokenSecond, process.env.ACCESS_SECRET)
            console.log("inviteDataSecond", inviteDataSecond)


            async function main() {
                // create reusable transporter object using the default SMTP transport
                const { email } = req.body
                const transporter = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    secure: false,
                    auth: {
                        user: "44dbe1cbc3bed6",
                        pass: "590788b48efe75",
                    },
                });

                // const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET)
                // // oAuth2Client.setCredentials({ refreshToken: process.env.REFRESH_SECRET})

             
                //     const accessToken = await oAuth2Client.getAccessToken()
                    
                // const transporter = nodemailer.createTransport({
                //     service: 'gmail',
                //     // host: 'smtp.gmail.com',
                //     // port: 587,
                //     // secure: false,
                //     auth: {
                //         user: process.env.NODEMAILER_USER,
                //         type: 'OAuth2',
                //         clientId: process.env.GOOGLE_CLIENT_ID,
                //         clientSecret: process.env.GOOGLE_SECRET,
                //         accessToken: accessToken,
                //         refreshToken: process.env.REFRESH_SECRET
                //       }
                //   });

                // send mail with defined transport object

                const url1 = `https://api.picanote.me/invite/?token=${inviteTokenFirst}`

                const info1 = await transporter.sendMail({
                    from: process.env.NODEMAILER_USER,
                    to: `${email[0]}`, // 초대하려고 선택한 유저의 이메일(req.body배열 중 첫번째 메일)
                    subject: "PicaNote 그룹일기 초대 메일입니다.", // Subject line
                    // text: `${userInfo.dataValues.username}` + "님이 Picanote그룹일기로 초대하셨습니다. 아래 링크를 누르면 그룹으로 초대됩니다." + `http://localhost:5000/invite/?token=${inviteToken}`, // 로그인한 유저의 이름으로 초대메세지가 입력됨
                    html: "<p>아래 링크를 누르면 그룹으로 초대됩니다.</p>" + "<a href=" + url1 + ">초대링크</a>"
                });

                const url2 = `https://api.picanote.me/invite/?token=${inviteTokenSecond}`

                const info2 = await transporter.sendMail({
                    from: process.env.NODEMAILER_USER,
                    to: `${email[1]}`, // 초대하려고 선택한 유저의 이메일(req.body배열 중 두번째 메일)
                    subject: "PicaNote 그룹일기 초대 메일입니다.", // Subject line
                    // text: `${userInfo.dataValues.username}` + "님이 Picanote그룹일기로 초대하셨습니다. 아래 링크를 누르면 그룹으로 초대됩니다." + `http://localhost:5000/invite/?token=${inviteToken}`, // 로그인한 유저의 이름으로 초대메세지가 입력됨
                    html: "<p>아래 링크를 누르면 그룹으로 초대됩니다.</p>" + "<a href=" + url2 + ">초대링크</a>"
                });

                //console.log(userInfo)
                console.log(info1)
                console.log(info2)
                // console.log("inviteData", inviteData)

                return res.status(201).json({ groupInfo: groupInfo.dataValues, message: '그룹 초대 메일이 발송되었습니다.' })
            }
            main()//이메일 발송 함수 실행

        }
    },

    inviteGroup: async (req, res) => {
        //초대 메일을 받은 유저가 메일 안의 링크를 누르면 그룹에 자동으로 추가됨.
        //메일 발송할 때 만든 inviteToken을 여기로 어떻게 가져올 수 있나?? => req.query로 가져올 수 있음.
        const inviteToken = req.query.token
        const inviteData = jwt.verify(inviteToken, process.env.ACCESS_SECRET);
        console.log(inviteData)

        Users_groups.create({
            UserId: inviteData.userId,
            GroupId: inviteData.groupId
        }) // Users_groups에 초대하려는 유저 정보 추가.

        res.status(201).json({ message: '그룹에 초대되었습니다.' })
        console.log("inviteData", inviteData)
    }
}