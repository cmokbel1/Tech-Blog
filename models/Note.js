
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')


class Note extends Model { }
Note.init({
  body: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'note' })

module.exports = Note
