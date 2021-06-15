'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Likes', [
      {
        userId: 2,
        diaryId: 33,
        like: 100,
        createdAt: "2021-05-01 07:36:06",
        updatedAt: "2021-05-01 07:36:06",
      },
      {
        userId: 2,
        diaryId: 35,
        like: 80,
        createdAt: "2021-05-01 07:36:06",
        updatedAt: "2021-05-01 07:36:06",
      },
      {
        userId: 2,
        diaryId: 39,
        like: 90,
        createdAt: "2021-05-01 07:36:06",
        updatedAt: "2021-05-01 07:36:06",
      },
      {
        userId: 2,
        diaryId: 40,
        like: 65,
        createdAt: "2021-05-01 07:36:06",
        updatedAt: "2021-05-01 07:36:06",
      },
      {
        userId: 2,
        diaryId: 46,
        like: 70,
        createdAt: "2021-05-01 07:36:06",
        updatedAt: "2021-05-01 07:36:06",
      },
      {
        userId: 2,
        diaryId: 56,
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
