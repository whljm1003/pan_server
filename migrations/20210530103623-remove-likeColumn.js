//작성자:문지영
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Diaries", "like");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Diaries", "like");
  }
};
