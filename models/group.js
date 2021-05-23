//작성자:김현영
'use strict';
const {
  Model
} = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Group.belongsToMany(models.User, { through: 'Users_groups', foreignKey: 'groupId' }); //groups와 users 테이블의 관계 정의 (N:M) : 한 그룹에 여러 사용자가 속할 수 있고 한 사용자는 여러 그룹에 속할 수 있다.
      models.Group.hasMany(models.Book, { foreignKey: 'groupId', sourceKey: 'id' }) // groups와 book 테이블의 관계 정의 (1:N) : 한 그룹이 여러 일기장을 가질 수 있다.
    }
  };
  Group.init({
    groupName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};