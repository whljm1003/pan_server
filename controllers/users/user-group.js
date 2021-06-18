//작성자:문지영
const { User, Group, Users_groups } = require('../../models');
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
    sendMail: async (req, res) => {
        // 그룹 생성
        // 그룹 일기장 만들기를 누르면, 그룹을 생성하고 그룹원에게 초대 메일이 발송됨.
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        // 1.로그인한 유저가 그룹일기장을 만들 때 먼저 그룹 만들기 클릭 => 그룹일기장의 id, userId, groupId, bookName, bookCover + 로그인 유저 id(owner)를 가져와서 그룹 일기장 생성
        // 1번은 books.js로 가야하나?

        // 2.회원 중에서 초대하고 싶은 유저 선택(최대 2명) => 그룹 생성하기 버튼 클릭 (owner가 포함된 group이 일단 만들어지는 것과 메일 발송이 동시에)
        const { email, groupName } = req.body;

        //그룹이 생성되어야 됨. owner는 그룹을 생성한 사람
        const groupInfo = await Group.create({
            groupName: groupName,
            owner: data.id
        }) // 여기서 groupdId가 생성됨.
        // console.log(groupInfo)

        // const userInfo = await User.findOne({ where: { email: email } }) // 초대하려는 유저 정보를 db에서 찾음
        // .then(arr => arr.map(el => el))

        const userInfo = await User.findAll({
            where: { email: email },
            attributes: ['id', 'email']
        })
        // .then(arr => arr.map(el => el.dataValues.id))

        // const userId = userInfo.join()
        // const userId = userInfo[0]// email 초대하려는 사람의 userId(가입된 유저들만 초대 가능).
        console.log('USERINFO', userInfo)
        const groupId = groupInfo.dataValues.id // email 초대하려는 groupd의 id, 위에서 그룹 만들 때 생성된 id.
        const userId = userInfo[0].id

        // console.log('UserInfo', userInfo)
        // console.log(email[0])

        if (userInfo.length === 1) {
            const inviteTokenFirst = jwt.sign({ userId, email, groupId }, process.env.ACCESS_SECRET, { expiresIn: '20m' }) // 초대하려는 사람의 userId, email, groupId 정보가 담긴 토큰 생성.
            const inviteDataFirst = jwt.verify(inviteTokenFirst, process.env.ACCESS_SECRET)
            console.log("inviteData", inviteDataFirst)

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
                    to: `${email[0]}`, // 초대하려고 선택한 유저의 이메일
                    subject: "PicaNote 그룹일기 초대 메일입니다.", // Subject line
                    // text: `${userInfo.dataValues.username}` + "님이 Picanote그룹일기로 초대하셨습니다. 아래 링크를 누르면 그룹으로 초대됩니다." + `http://localhost:5000/invite/?token=${inviteToken}`, // 로그인한 유저의 이름으로 초대메세지가 입력됨
                    html: "<p>아래 링크를 누르면 그룹으로 초대됩니다.</p>" + `http://localhost:5000/invite/?token=${inviteTokenFirst}` // html body,  <a href='http://localhost:3000/invite/?email=" + email + "&token=abcdefg'>그룹초대</a>, `http://localhost:3000/invite/?token=${token}`
                }); // <a href="#" onclick=" location.href = 'http://blog.naver.com/kyoungseop?a=<%=a%>&b=<%=b%>' + '&c=' + c; return false;">Myblog</a>

                //console.log(userInfo)
                console.log(info)
                // console.log("inviteData", inviteData)

                res.status(200).json({ message: '그룹 초대 메일이 발송되었습니다.' })
            }

            main().catch(console.error);

        } else if (userInfo.length === 2) {
            const email1 = email[0]
            const userId1 = userInfo[0].id
            const inviteTokenFirst = jwt.sign({ userId: userId1, email: email1, groupId }, process.env.ACCESS_SECRET, { expiresIn: '20m' }) // 초대하려는 사람의 userId, email, groupId 정보가 담긴 토큰 생성.
            const inviteDataFirst = jwt.verify(inviteTokenFirst, process.env.ACCESS_SECRET)
            console.log("inviteDataFirst", inviteDataFirst)

            const email2 = email[1]
            const userId2 = userInfo[1].id
            const inviteTokenSecond = jwt.sign({ userId: userId2, email: email2, groupId }, process.env.ACCESS_SECRET, { expiresIn: '20m' })
            const inviteDataSecond = jwt.verify(inviteTokenSecond, process.env.ACCESS_SECRET)
            console.log("inviteDataSecond", inviteDataSecond)
            console.log(email)


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
                const info1 = await transporter.sendMail({
                    from: "groupdiary@picanote.com", // picanote에서 발송 // `"WDMA Team" <${process.env.NODEMAILER_USER}>`
                    to: `${email[0]}`, // 초대하려고 선택한 유저의 이메일
                    subject: "PicaNote 그룹일기 초대 메일입니다.", // Subject line
                    // text: `${userInfo.dataValues.username}` + "님이 Picanote그룹일기로 초대하셨습니다. 아래 링크를 누르면 그룹으로 초대됩니다." + `http://localhost:5000/invite/?token=${inviteToken}`, // 로그인한 유저의 이름으로 초대메세지가 입력됨
                    html: "<p>아래 링크를 누르면 그룹으로 초대됩니다.</p>" + `http://localhost:5000/invite/?token=${inviteTokenFirst}` // html body,  <a href='http://localhost:3000/invite/?email=" + email + "&token=abcdefg'>그룹초대</a>, `http://localhost:3000/invite/?token=${token}`
                }); // <a href="#" onclick=" location.href = 'http://blog.naver.com/kyoungseop?a=<%=a%>&b=<%=b%>' + '&c=' + c; return false;">Myblog</a>

                const info2 = await transporter.sendMail({
                    from: "groupdiary@picanote.com", // picanote에서 발송 // `"WDMA Team" <${process.env.NODEMAILER_USER}>`
                    to: `${email[1]}`, // 초대하려고 선택한 유저의 이메일
                    subject: "PicaNote 그룹일기 초대 메일입니다.", // Subject line
                    // text: `${userInfo.dataValues.username}` + "님이 Picanote그룹일기로 초대하셨습니다. 아래 링크를 누르면 그룹으로 초대됩니다." + `http://localhost:5000/invite/?token=${inviteToken}`, // 로그인한 유저의 이름으로 초대메세지가 입력됨
                    html: "<p>아래 링크를 누르면 그룹으로 초대됩니다.</p>" + `http://localhost:5000/invite/?token=${inviteTokenSecond}` // html body,  <a href='http://localhost:3000/invite/?email=" + email + "&token=abcdefg'>그룹초대</a>, `http://localhost:3000/invite/?token=${token}`
                }); // <a href="#" onclick=" location.href = 'http://blog.naver.com/kyoungseop?a=<%=a%>&b=<%=b%>' + '&c=' + c; return false;">Myblog</a>


                //console.log(userInfo)
                console.log(info1)
                console.log(info2)
                // console.log("inviteData", inviteData)

                res.status(200).json({ message: '그룹 초대 메일이 발송되었습니다.' })
            }

            main().catch(console.error);
        }

        // const userId = userInfo// email 초대하려는 사람의 userId(가입된 유저들만 초대 가능).
        // console.log('UserId', userId)
        // const groupId = groupInfo.dataValues.id // email 초대하려는 groupd의 id, 위에서 그룹 만들 때 생성된 id.
        // const inviteToken = jwt.sign({ userId, email, groupId }, process.env.ACCESS_SECRET, { expiresIn: '20m' }) // 초대하려는 사람의 userId, email, groupId 정보가 담긴 토큰 생성.
        // const inviteData = jwt.verify(inviteToken, process.env.ACCESS_SECRET)

        // 3.선택한 유저들에게 초대 메일 발송
        // async function main() {
        //     // Generate test SMTP service account from ethereal.email
        //     // create reusable transporter object using the default SMTP transport
        //     const { email } = req.body
        //     const transporter = nodemailer.createTransport({
        //         host: "smtp.mailtrap.io",
        //         port: 2525,
        //         secure: false, // true for 465, false for other ports
        //         auth: {
        //             user: "44dbe1cbc3bed6",
        //             pass: "590788b48efe75",
        //         },
        //     });

        //     // const transporter = nodemailer.createTransport({
        //     //     service: 'gmail',
        //     //     host: 'smtp.gmail.com',
        //     //     port: 587,
        //     //     secure: false,
        //     //     auth: {
        //     //       user: process.env.NODEMAILER_USER,
        //     //       pass: process.env.NODEMAILER_PASS
        //     //     }
        //     //   });

        //     // send mail with defined transport object
        //     const info = await transporter.sendMail({
        //         from: "groupdiary@picanote.com", // picanote에서 발송 // `"WDMA Team" <${process.env.NODEMAILER_USER}>`
        //         to: `${email[0]}`, // 초대하려고 선택한 유저의 이메일
        //         subject: "PicaNote 그룹일기 초대 메일입니다.", // Subject line
        //         // text: `${userInfo.dataValues.username}` + "님이 Picanote그룹일기로 초대하셨습니다. 아래 링크를 누르면 그룹으로 초대됩니다." + `http://localhost:5000/invite/?token=${inviteToken}`, // 로그인한 유저의 이름으로 초대메세지가 입력됨
        //         html: "<p>아래 링크를 누르면 그룹으로 초대됩니다.</p>" + `http://localhost:5000/invite/?token=${inviteTokenFirst}` // html body,  <a href='http://localhost:3000/invite/?email=" + email + "&token=abcdefg'>그룹초대</a>, `http://localhost:3000/invite/?token=${token}`
        //     }); // <a href="#" onclick=" location.href = 'http://blog.naver.com/kyoungseop?a=<%=a%>&b=<%=b%>' + '&c=' + c; return false;">Myblog</a>

        //     //console.log(userInfo)
        //     console.log(info)
        //     // console.log("inviteData", inviteData)

        //     res.status(200).json({ message: '그룹 초대 메일이 발송되었습니다.' })
        // }

        // main().catch(console.error);

        // 4.메일을 받은 유저가 메일 내 링크를 클릭하면 => 해당 토큰이 서버에 받아지고, users_groups에 해당 userId가 자동으로 저장됨?
        // http://localhost/invite/?email=abigail90@naver.com,%20%20kimcoding@gmail.com&token=abcdefg

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