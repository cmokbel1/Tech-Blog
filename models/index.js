const User = require('./User.js')
const Post = require('./Post.js')
const Comment = require('./Note.js')

User.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo(User, { foreignKey: 'uid' })

User.hasMany(Note, { foreignKey: 'uid' })
Note.belongsTo(User, { foreignKey: 'uid' })

Post.hasMany(Note, { foreignKey: 'uid' })
Note.belongsTo(Post, { foreignKey: 'uid' })

module.exports = { User, Post, Note }
