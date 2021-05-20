//작성자:김현영
'use strict';
const {
  Model
} = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Book.belongsTo(models.Group, {foreignKey:groupId, TargetKey:'id'}) // books와 groups 테이블의 관계 정의 (N:1): 한 그룹은 여러 일기장을 가진다.
      models.Book.hasMany(models.Diary, {foreignKey:bookId, SourceKey:'id'}) // books와 diaries 테이블의 관계 정의 (1:N): 한 책은 여러 일기를 가진다.
    }
  };
  Book.init({
    bookName: DataTypes.STRING,
    bookCover: DataTypes.STRING,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};