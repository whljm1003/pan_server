'use strict';
//작성자:김현영
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Groups',
      'owner',
    {
      type: Sequelize.INTEGER
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Groups',
      'owner',
      {
        type: Sequelize.STRING
      }
    )
  }
};
