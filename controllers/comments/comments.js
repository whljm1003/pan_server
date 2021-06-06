//작성자:김현영

const { User, Comment } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
    post: async (req, res) => {

        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        const userInfo = await User.findOne({ where: { id: data.id } });
        const diaryId = req.params.diaryId

        const { text } = req.body;
        if(!userInfo){
            return res.status(400).json({ message: '로그인 해 주세요!'})
        }
        if (!text) {
            return res.status(401).json({ message: '내용을 입력해주세요.' })
        }
        Comment.create({
            userId: userInfo.dataValues.id, 
            diaryId,
            text
        })
        res.status(200).json({ message: '일기가 성공적으로 저장되었습니다.' })
    },

    delete : async (req, res) => {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });
        const commentId= req.params.id;

        const comment = await Comment.findOne({
            where: { id: commentId }
        });
        if(comment.dataValues.userId !== userInfo.id){
            return res.status(400).json({ message : '댓글을 삭제할 권한이 없습니다.'})
        }
        Comment.destroy({
            where: { id : commentId }
        })
        res.status(200).json({ message: '댓글이 삭제되었습니다.' })
    },

    put : async (req, res) => {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        const userInfo = await User.findOne({ where: { id: data.id } });
        const commentId= req.params.id;
        const { text, diaryId } = req.body;

        //text의 내용이 
        
    }

}