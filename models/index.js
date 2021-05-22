//작성자:김현영
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
const User = require('./user');
const Group = require('./group');
const Diary = require('./diary');
const Comment = require('./comment');
const Book = require('./book');


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// db.User = User;
// db.Group = Group;
// db.Comment = Comment;
// db.Book = Book;
// db.Diary = Diary;

// User.init(sequelize);
// Group.init(sequelize);
// Comment.init(sequelize);
// Book.init(sequelize);
// Diary.init(sequelize);

// User.associate(db);
// Group.associate(db);
// Comment.associate(db);
// Book.associate(db);
// Diary.associate(db);



module.exports = db;
