//작성자:김현영
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

module.exports = {
    findPwd :async(req,res) =>{
        const userInfo = await User.findOne({
            where: { email: req.body.email }
        });

        //유효한 이메일일 경우에만 토큰을 생성한다.
        if(!userInfo){
            res.status(400).json({message: '등록된 사용자 이메일이 아닙니다.'})
        }else{
            const { id, username, email, profileUrl } = userInfo.dataValues;
            console.log(id, username, email, profileUrl)
            const token = jwt.sign({ id, username, email, profileUrl }, process.env.ACCESS_SECRET, {expiresIn:"1h"});
  
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: "smtp.gmail.com",
                port: 587, 
                secure: false,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS,
                },
            });
            const url = `https://picanote.me/resetPwd/${token}`;
            const emailOptions = {
                from: process.env.NODEMAILER_USER,
                to: email,
                subject: 'picanote 비밀번호 초기화 이메일입니다.',
                html: '비밀번호 초기화를 위해 아래 URL을 클릭해 주세요.' + '<a href=' + url + '>초대링크</a>'
            };
            transporter.sendMail(emailOptions);
            res.status(200).json({message: '비밀번호 초기화를 위한 링크가 전송되었습니다.'})
        }
    },
    resetPwd: async(req, res) => {
        //const { token } = req.query;
        const token = new URL(window.location.href).searchParams.get('code');
        const authData = jwt.verify(token, process.env.ACCESS_SECRET);
        const { password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);

        User.update({password : encryptedPassword},{ // 비밀번호 update 시 다른 username, email 등 테이블에 원래 있던 다른 내용들은 생략해도 되나?
            where: {
                id: authData.id
            }
        })
        .res.status(200).json({message:'비밀번호 재설정이 완료되었습니다.'});
    }
}





/*
SMTP : Simple Mail Transfer Protocol
왜 메일을 보낼 때 하필 465번 포트를 사용하는 걸까?
-> 발신 메일 서버의 경우 SSL용 포트 번호는 465번 포트를 사용하고 TLS, STARTTLS용 포트는 587번을 사용한다고 한다.
(587번 포트는 465번 다음 나온 포트 번호이다.)
*/