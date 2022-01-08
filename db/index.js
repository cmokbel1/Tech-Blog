// const { Sequelize } = require('sequelize')

// module.exports = new Sequelize(process.env.NODE_ENV === 'production' ? process.env.JAWSDB_URL : 'mysql://root:ElsaRoseyButterScotch@localhost:3306/techblog_db')


const { Sequelize } = require('sequelize')
require('dotenv').config();


module.exports = new Sequelize(process.env.JAWSDB_URL, {
    dialect: 'mysql'
  } || process.env.LOCALDB_URL)