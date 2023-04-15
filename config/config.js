require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false
  }
}