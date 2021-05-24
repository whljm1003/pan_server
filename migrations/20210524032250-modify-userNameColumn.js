'use strict';
//작성자:김현영
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "userName");
    await queryInterface.addColumn("Users", "username", {
      type: Sequelize.STRING,
      allowNull: false,
      after: "id"
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "username");
    await queryInterface.addColumn("Users", "userName", {
      type: Sequelize.STRING,
      allowNull: false,
      after: "id"
    })
  }
};
