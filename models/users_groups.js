//작성자:문지영
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users_groups.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      Users_groups.belongsTo(models.Group, {
        foreignKey: 'groupId'
      })
    }
  };
  Users_groups.init({
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users_groups',
  });
  return Users_groups;
};