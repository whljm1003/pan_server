//작성자:문지영
const sequelize = require("sequelize");
const { Diary, Like } = require('../../models');
const { or, like } = sequelize.Op;


module.exports = async (req, res) => {
    //키워드로 일기 내용 검색하기
    //일치검색X, 
    //유사검색O, 즉 title이 'test'인 게시물을 검색하는 경우, 제목이 정확히 'test'인 게시물만 찾는 것이 아니라, title에 'test'가 들어간 모든 게시물을 찾아야 됨.
    // select * from Diaries where title like '%우주%';
    const keyword = req.query.q;
    // console.log(keyword)

    const diary = await Diary.findAll({
        where: { [or]: [{ title: { [like]: `%${keyword}%` } }, { content: { [like]: `%${keyword}%` } }] },
        attributes: ['id', 'userId', 'bookId', 'type', 'title', 'weather', 'content', [sequelize.col("like"), "like"], 'private', 'picUrl', 'date', 'feelings', 'createdAt', 'updatedAt'],
        include: [{
            model: Like,
            required: false,
            attributes: []
        }]
    })
    res.status(200).json({ data: diary, message: '검색과 일치하는 내용의 일기를 찾았습니다.' })
}