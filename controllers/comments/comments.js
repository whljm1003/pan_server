//작성자:김현영
const { User, Comment } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
    post: async (req, res) => {
        //댓글 생성 요청 시
        //해당 일기의 id를 파라미터로 전달받는다.
        //필수 정보가 모두 입력되어 있을 경우 댓글을 생성한다.
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        const userInfo = await User.findByPk(data.id)
        const { diaryId }= req.params
        const { text } = req.body;
        if(!userInfo){
            return res.status(400).json({ message: '로그인 해 주세요!'})
        }
        else if (!text) {
            return res.status(401).json({ message: '내용을 입력해주세요.' })
        }else{
            Comment.create({
                userId: data.id, 
                diaryId,
                text
            })
            res.status(200).json({ message: '댓글이 성공적으로 저장되었습니다.' })
        }
    },

    delete : async (req, res) => {
        //해당 댓글 삭제 시
        //댓글의 id를 파라미터로 전달받는다.
        //유저의 정보가 댓글을 작성했던 유저의 정보와 일치할 때만 삭제할 수 있다.
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        const commentId = req.params.id

        const comment = await Comment.findByPk(commentId)
        if(comment.dataValues.userId !== data.id){
            return res.status(400).json({ message : '댓글을 삭제할 권한이 없습니다.'})
        }else{
            Comment.destroy({
                where: { id : commentId }
            })
            res.status(200).json({ message: '댓글이 삭제되었습니다.' })
        }
    },

    put : async (req, res) => {
        //해당 댓글 수정 시
        //댓글의 id를 파라미터로, 수정할 내용은 text로 전달받는다.
        //유저의 정보가 댓글을 작성했던 유저의 정보와 일치할 때만 수정할 수 있다. 
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        //const userInfo = await User.findOne({ where: { id: data.id } });
        const commentId = req.params.id
        const change = req.body;

        const comment = await Comment.findByPk(commentId);
        if(comment.dataValues.userId !== data.id){
            res.status(400).json({message: '댓글을 수정할 권한이 없습니다.'})
        }else{
            Comment.update(change,{where: { id : commentId }})
            res.status(200).json({message: '댓글이 수정되었습니다.'})
        }
    }
}