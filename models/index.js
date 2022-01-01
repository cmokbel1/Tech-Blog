const User = require('./User.js')
const Post = require('./Post.js')
const Note = require('./Note.js')

User.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo(User, { foreignKey: 'uid' })

User.hasMany(Note, { foreignKey: 'uid' })
Note.belongsTo(User, { foreignKey: 'uid' })

Post.hasMany(Note, { foreignKey: 'pid' })
Note.belongsTo(Post, { foreignKey: 'pid' })

module.exports = { User, Post, Note }
