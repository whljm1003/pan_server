'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Diaries',
      'feelings',
      {
        type: Sequelize.STRING
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Diaries',
      'feelings',
      {
        type: Sequelize.STRING
      }
    )
  }
};
