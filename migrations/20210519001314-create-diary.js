'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Diaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      weather: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      private: {
        type: Sequelize.BOOLEAN
      },
      like: {
        type: Sequelize.INTEGER
      },
      picUrl: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      feelings: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Diaries');
  }
};