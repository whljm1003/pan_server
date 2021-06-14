'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Likes', [
      {
        userId: 6,
        diaryId: 226,
        like: 100,
        createdAt: "2021-05-01 07:36:06",
        updatedAt: "2021-05-01 07:36:06",
      },
      {
        userId: 6,
        diaryId: 227,
        like: 80,
        createdAt: "2021-05-01 07:36:06",
        updatedAt: "2021-05-01 07:36:06",
      },
      {
        userId: 6,
        diaryId: 228,
        like: 90,
        createdAt: "2021-05-01 07:36:06",
        updatedAt: "2021-05-01 07:36:06",
      },
      {
        userId: 6,
        diaryId: 229,
        like: 65,
        createdAt: "2021-05-01 07:36:06",
        updatedAt: "2021-05-01 07:36:06",
      },
      {
        userId: 6,
        diaryId: 230,
        like: 70,
        createdAt: "2021-05-01 07:36:06",
        updatedAt: "2021-05-01 07:36:06",
      },
      {
        userId: 6,
        diaryId: 231,
        like: 88,
        createdAt: "2021-05-01 07:36:06",
        updatedAt: "2021-05-01 07:36:06",
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Likes', null, {});
  }
};
