'use strict';
//작성자:김현영
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Diaries',
      'date',
    {
      type: Sequelize.DATEONLY
    }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'Diaries',
      'date',
    {
      type: Sequelize.DATE
    }
    )
  }
};
