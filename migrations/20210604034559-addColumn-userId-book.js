//작성자:문지영
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Books", "userId", {
      type: Sequelize.INTEGER,
      after: "id"
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Books", "userId", {
      type: Sequelize.INTEGER,
      after: "id"
    })
  }
};
