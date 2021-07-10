//작성자:문지영
const sequelize = require("sequelize");
const { Diary, Like, Book } = require('../../models');
const { or, and, like } = sequelize.Op;


module.exports = async (req, res) => {
    //키워드로 일기 내용 검색하기
    //일치검색X, 
    //유사검색O, 즉 title이 'test'인 게시물을 검색하는 경우, 제목이 정확히 'test'인 게시물만 찾는 것이 아니라, title에 'test'가 들어간 모든 게시물을 찾아야 됨.
    // select * from Diaries where title like '%우주%';
    const keyword = req.query.q;
    // console.log(keyword)
    // 검색어를 입력하지 않았을 때
    if (!keyword) {
        res.status(400).json({ message: '검색어를 입력해주세요.' })
    }

    // 검색 결과가 없을 때(searchDiary의 데이터가 존재하지 않을 때)
    const searchDiary = await Diary.findAll({
        where: { [and]: [{ private: false }], [or]: [{ title: { [like]: `%${keyword}%` } }, { content: { [like]: `%${keyword}%` } }] },
    })

    if (searchDiary.length === 0) {
        return res.status(401).json({ message: '검색과 일치하는 내용의 일기가 없습니다.' })
    }

    // 검색 결과가 있을 때
    // 조건은 private이 false이면서(and), title or content중 일치하는 내용이 있을 때
    const diary = await Diary.findAll({
        where: { [and]: [{ private: false }], [or]: [{ title: { [like]: `%${keyword}%` } }, { content: { [like]: `%${keyword}%` } }] },
        attributes: ['id', 'userId', 'bookId', [sequelize.col("bookCover"), "bookCover"], 'type', 'title', 'weather', 'content', [sequelize.col("like"), "like"], 'private', 'picUrl', 'date', 'feelings', 'createdAt', 'updatedAt'],
        include: [{
            model: Like,
            required: false,
            attributes: []
        },
        {
            model: Book,
            required: false,
            attributes: []
        }]
    })
    res.status(200).json({ data: diary, message: '검색과 일치하는 내용의 일기입니다.' })
    console.log(diary)
}