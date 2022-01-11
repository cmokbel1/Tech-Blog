const router = require('express').Router()
const JwtStrategy = require('passport-jwt/lib/strategy')
const { User, Post, Note } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const helpers = require('../helpers')

router.get('/', async (req, res) => {
  let data = {
    isLoggedIn: req.session.loggedIn ? true : false,
    username: req.session.loggedIn ? req.session.username : "ERROR"
  }

  let posts = await Post.findAll({
    raw: true,
    include: [{ model: User, atrributes: ['username'] }],
    order: [['createdAt', 'DESC']]
  })

  console.log(posts)
  data.posts = posts
  res.render('index', data);

})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;

  } else {
    const data = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR"
    }
    res.render('login', data)
  }
})

router.get('/register', async (req, res) => {
  const data = {
    isLoggedIn: req.session.loggedIn ? true : false,
    username: req.session.loggedIn ? req.session.username : "ERROR"
  }
  res.render('register')
})

router.get('/dashboard', async (req, res) => {
  let data = {
    isLoggedIn: req.session.loggedIn ? true : false,
    username: req.session.loggedIn ? req.session.username : "ERROR"
  }

  let posts = await Post.findAll({
    raw: true,
    include: [{ model: User, atrributes: ['username'] }],
    order: [['createdAt', 'DESC']]
  })
  data.posts = posts
  res.render('dashboard', data)
})
// helpers.isLoggedIn,
router.get('/newpost',  (req, res) => {
  let data = {
    isLoggedIn: req.session.loggedIn ? true : false,
    username: req.session.loggedIn ? req.session.username : "ERROR"
  }

  res.render('newpost', data);
})


router.get('/editpost/:id', helpers.isLoggedIn, async (req, res) => {
  let data = {
    isLoggedIn: req.session.loggedIn ? true : false,
    username: req.session.loggedIn ? req.session.username : "ERROR"
  }

  let post = await Post.findOne({
    raw: true,
    where: { id: req.params.id }
  })

  data.post = post
  res.render('editpost', data)
})

router.get('/post/:id', async (req, res) => {
  let data = {
    isLoggedIn: req.session.loggedIn ? true : false,
    username: req.session.loggedIn ? req.session.username : "ERROR"
  }

  let post = await Post.findOne({
    raw:true,
    include: [{model: User, attributes: ['username']}],
    where: {id: req.params.id}
  })
  data.post = post

  let notes = await Note.findAll({
    raw: true,
    where: { uid: req.params.id }
  })
  console.log(notes)
  
  data.notes = notes
  res.render('post', data)
})

router.get('/logout', async (req,res) => {
  if (req.session.loggedIn) {
    console.log('Getting out of here!')
    req.session.destroy(() => {
      res.render('logout')
    })
  } else {
    console.log('Not logged in')
    res.redirect('/')
  }
})

module.exports = router