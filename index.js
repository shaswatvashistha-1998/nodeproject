const Sequelize = require('sequelize')
const db = new Sequelize({
  dialect:'postgres',
  username:'postgres',
  password:'shas8290819282',
  host:'localhost',
  port:5432,
  database:'todo_database'
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