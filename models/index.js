const User = require('./User.js')
const Post = require('./Post.js')
const Comment = require('./Comment.js')

User.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo(User, { foreignKey: 'uid' })
User.hasMany(Comment, { foreignKey: 'uid' })
Comment.belongsTo(User, { foreignKey: 'uid' })
Post.hasMany(Comment, { foreignKey: 'uid' })
Comment.belongsTo(Post, { foreignKey: 'uid' })

module.exports = { User, Post, Comment }
