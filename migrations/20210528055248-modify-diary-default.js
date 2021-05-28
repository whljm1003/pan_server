'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Diaries',
      'private',
      {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Diaries',
      'private',
      {
        type: Sequelize.BOOLEAN,
      }
    )
  }
};
