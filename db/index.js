// const { Sequelize } = require('sequelize')

// module.exports = new Sequelize(process.env.NODE_ENV === 'production' ? process.env.JAWSDB_URL : 'mysql://root:ElsaRoseyButterScotch@localhost:3306/techblog_db')


const { Sequelize } = require('sequelize')
require('dotenv').config();

const sequelize = process.env.JAWSDB_URL ?
  new Sequelize(process.env.JAWSDB_URL) :
  new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3000
  })

module.exports = sequelize