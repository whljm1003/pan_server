'use strict';
//작성자:김현영
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "socialLoginId", {
      type: Sequelize.STRING,
      allowNull:true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "socialLoginId")
  }
};
