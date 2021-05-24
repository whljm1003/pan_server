//작성자:김현영
const { User } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {  

    /*
    입력받은 이메일이 일치하는지 검사한다.
        -이메일 불일치 : 에러메세지
        -이메일 일치 : 비밀번호를 검사한다.
            -비밀번호 불일치 : 에러메세지
            -비밀번호 일치 : 회원탈퇴 진행
    */
    const {email, password} = req.body;
    const userRequested= await User.findOne({
        where:{
            email
        }
    });
    if(!userRequested){
        res.status(400).send('일치하는 사용자 정보가 없습니다.')
    }
    const checkPassword = await bcrypt.compare(password, userRequested.dataValues.password);
    if(!checkPassword){
        res.status(401).send('비밀번호가 일치하지 않습니다.')
    }
    await userRequested.destroy({
        truncate:true
    });
    res.status(200).send('회원탈퇴가 성공적으로 진행되었습니다.')
    
}