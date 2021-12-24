// environment configuration
require('dotenv').config()

const express = require('express')
const { join } = require('path')

// defining passport path
const passport = require('passport')
// defining the required models for functionality
const { User, Post } = require('./models')

const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

const app = express()
// linking the front end to the back end
app.use(express.static(join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//express uses passport and initializes / calls into session
app.use(passport.initialize())
app.use(passport.session())

// user authenticator
passport.use(User.createStrategy())

// saves user to session
passport.serializeUser(User.serializeUser())
// unsaves user from session
passport.deserializeUser(User.deserializeUser())
// authentication
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, async function ({ id }, cb) {
  try {
    const user = await User.findOne({ where: { id }, include: [Post] })
    cb(null, user)
  } catch (err) {
    cb(err, null)
  }
}))

app.use(require('./routes'))

async function init() {
  await require('./db').sync()
  app.listen(process.env.PORT || 3000)
}

init()
