'use strict';
//작성자:김현영
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Diaries","bookdId","bookId");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Diaries","bookId","bookdId");
  }
};
