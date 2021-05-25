'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Diaries', [
      {
        userId: 1,
        bookId: 1,
        type: 1,
        title: 'fake diary seed',
        weather: 'sunny',
        content: 'what a lovely day to code',
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        userId: 2,
        bookId: 2,
        type: 1,
        title: '2nd',
        weather: 'rainy',
        content: 'hungry.. want some pizza.',
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        userId: 1,
        bookId: 1,
        type: 1,
        title: '3rd',
        weather: 'sunny',
        content: 'dont forget to code your dream',
        private: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        userId: 2,
        bookId: 3,
        type: 1,
        title: '4th - group',
        weather: 'cloudy',
        content: 'moon where r u',
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        bookId: 3,
        type: 1,
        title: '5th -group',
        weather: 'sunny',
        content: 'time to go',
        private: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Diaries', null, {})
  }
};
