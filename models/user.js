//작성자:김현영
'use strict';
const {
  Model
} = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Comment, { foreignKey: 'userId', sourceKey: 'id' });  //users와 comments 테이블의 관계 정의 (1:N)
      models.User.hasMany(models.Diary, { foreignKey: 'userId', sourceKey: 'id' }); //users와 diaries 테이블의 관계 정의 (1:N)
      models.User.belongsToMany(models.Group, { through: 'Users_groups'}); //users와 groups 테이블의 관계 정의 (N:M)
      models.User.hasMany(models.Like, { foreignKey: 'userId' }) //users와 likes 테이블은 1:N(한 명의 유저는 여러 개의 좋아요를 누를 수 있음)
      models.User.hasMany(models.Book, { foreignKey: 'userId', sourceKey: 'id' }) //한 명의 유저는 여러 개의 일기장을 가질 수 있음.
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profileUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};