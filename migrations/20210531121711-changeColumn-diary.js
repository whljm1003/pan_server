'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Diaries',
      'content',
      {
        type: Sequelize.TEXT
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Diaries',
      'content',
      {
        type: Sequelize.STRING
      }
    )
  }
};
