const router = require('express').Router()
const JwtStrategy = require('passport-jwt/lib/strategy')
const { User, Post, Comment } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const helpers = require('../helpers')

router.get('/' async (req,res) => {
    let data = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR"
    }

    let posts = await Post.findAll({
      raw:true,
      include: [{model: User, atrributes: ['username']}],
      order: [['createdAt', 'DESC']]
    })

    console.log(posts)
    data.posts = posts
    res.render('index', data);

})

router.get('/login', (req,res) => {
  if (req.sessions.loggedIn) {
    res.redirect('/dashboard');
    return;

  } else {
    const data = {
      isLoggedIn: req.session.loggedIn ? true : false,
      username: req.session.loggedIn ? req.session.username : "ERROR"
    }
  res.render('login', data)
  }
}

router.get('/register', async (req,res) => {
  const data = {
    isLoggedIn: req.session.loggedIn ? true : false,
    username: req.session.loggedIn ? req.session.username : "ERROR"
  }
  res.render('register')
})

router.get('/dashboard', async (req,res) => {
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
