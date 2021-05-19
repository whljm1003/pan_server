//작성자:김현영
'use strict';
const {
  Model
} = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Comment.belongsTo(models.User, {foreignKey: 'userId', TargetKey: 'id'})    //comments와 users 테이블의 관계 정의(N:1): 한 명의 사용자가 여러 코멘트를 남길 수 있다.
      models.Comment.belongsTo(models.Diary, {foreignKey: 'diaryId', TargetKey: 'id'})  //comments와 diary 테이블의 관계 정의(N:1): 한 일기에 여러 코멘트가 달릴 수 있다.
    }
  };
  Comment.init({
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};