const { Group} = require('../../models');

module.exports = {
    get: async (req, res) => {
        const groups = await Group.findAll({});
    
    res.status(200).json({data: groups, message:'그룹 목록입니다'})
    }
}