//작성자:문지영
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.User, {
        foreignKey: 'userId'
      }) //한 개의 좋아요에는 한 명의 유저만 있음.

      Like.belongsTo(models.Diary, {
        foreignKey: 'diaryId'
      }) //한 개의 좋아요에는 하나의 다이어리만 있음.
    }
  };
  Like.init({
    userId: DataTypes.INTEGER,
    diaryId: DataTypes.INTEGER,
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};