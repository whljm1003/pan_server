const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "pan_development",
    host: "127.0.0.1",
    dialect: "mysql"
  },

  production: {
    username: "pan",
    password: process.env.DATABASE_PASSWORD,
    database: "pan",
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: '13306'
  }
}
