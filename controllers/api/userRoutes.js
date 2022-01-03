const router = require('express').Router()
const { User, Post, Note } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { redirect } = require('express/lib/response')

//register account
router.post('/users/register', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.redirect('/login')
  })
})


//login account
router.post('/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    
    if (err) { console.log(err) }

    res.session.save(() => {
      req.session.userId = user.id;
      req.session.username = username;
      req.session.loggedIn = true;


      res.json(user ? {
        username: user.username,
        token: jwt.sign({ id: user.id }, process.env.SECRET)
      } : null)
    })

  })

})

//retrieve user profile
router.get('/users/profile', passport.authenticate('jwt'), (req, res) => res.json(req.user))

module.exports = router 