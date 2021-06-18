const { User, Auth } = require('../../models');
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
            const token = jwt.sign({ username, email, profileUrl }, process.env.ACCESS_SECRET, {expiresIn:"1h"});
            const authData = { token, userId:id, ttl: 300} // db Auth 테이블에 저장할 데이터 생성
            Auth.create(authData); // auth 테이블 대신 해독하는 걸로하기
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465, // 아래 설명 참고
                secure: true,
                auth: {
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PWD,
                },
            });
            const emailOptions = {
                from: process.env.NODEMAILER_USER,
                to: email,
                subject: 'picanote 비밀번호 초기화 이메일입니다.',
                html: '비밀번호 초기화를 위해 아래 URL을 클릭해 주세요.' + `http://localhost:80/reset/${token}`
            };
            transporter.sendMail(emailOptions);
            res.status(200).json({message: '비밀번호 초기화를 위한 링크가 전송되었습니다.'})
        }
    },
    resetPwd: async(req, res) => {
        const { token, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);

        Auth.findOne({ 
            where : { token}
        })
        .then(Auth => {
            User.update({
                password : encryptedPassword, // 비밀번호 update 시 다른 username, email 등 테이블에 원래 있던 다른 내용들은 생략해도 되나?
            }, {
                where: {id: Auth.userId}
            })
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