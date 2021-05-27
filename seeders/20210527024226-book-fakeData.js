'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [
      {
        groupId: null,
        bookName: "my first book",
        bookCover: "https://images-na.ssl-images-amazon.com/images/I/31vWdstBY-L._SX331_BO1,204,203,200_.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        groupId: null,
        bookName: "diary book",
        bookCover: "https://previews.123rf.com/images/ketle/ketle1807/ketle180700030/109476039-cover-of-the-diary-notebook-vintage-pink-flowers-stripes-and-ribbon-with-text-on-a-pink-background-c.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        groupId: 1,
        bookName: "our group book",
        bookCover: "https://i.pinimg.com/originals/60/15/40/601540c2d308d1969877a6ca47fef1da.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {})
  }
};
