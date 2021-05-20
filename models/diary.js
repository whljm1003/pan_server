//작성자:김현영
'use strict';
const {
  Model
} = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Diary.hasMany(models.Comment, {foreignKey:'diaryId', SourceKey:'id'});  //diaries와 comments 테이블의 관계 정의 (1:N): 한 일기는 여러 코멘트를 가진다.
      models.Diary.belongsTo(models.User, {foreignKey: 'userId', TargetKey: 'id'});  //diaries와 users 테이블의 관계 정의 (N:1): 한 사용자가 여러 일기를 작성할 수 있다.
      models.Diary.belongsTo(models.Book, {foreignKey: 'bookId', TargetKey: 'id'});  //diaries와 books 테이블의 관계 정의 (N:1): 한 일기장이 여러 일기를 가질 수 있다.
    }
  };
  Diary.init({
    type: DataTypes.INTEGER,
    title: DataTypes.STRING,
    weather: DataTypes.STRING,
    content: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    like: DataTypes.INTEGER,
    picUrl: DataTypes.STRING,
    date: DataTypes.DATE,
    feelings: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Diary',
  });
  return Diary;
};