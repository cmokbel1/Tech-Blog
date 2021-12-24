const pls = require('passport-local-sequelize')
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')


const Comment = pls.defineComment(sequelize, {
  body: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Comment
