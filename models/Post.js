const pls = require('passport-local-sequelize')
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')


const Post = pls.definePost(sequelize, {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Post
