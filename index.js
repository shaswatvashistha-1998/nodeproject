const Sequelize = require('sequelize')
const env=require('dotenv').config()
const db = new Sequelize({
  dialect:process.env.DATABASE_NAME,
  username:process.env.DATABASE_USERNAME,
  password:process.env.DATABASE_USER_PASSWORD,
  host:process.env.APP_HOST,
  port:process.env.DATABASE_PORT,
  database:process.env.DATABASE_NAME
});
const blogs = db.define('blogs', {
  name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.TEXT
  },
  blogs1: {
    type: Sequelize.TEXT
  }
})
module.exports={ db,blogs }
