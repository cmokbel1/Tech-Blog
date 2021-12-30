const router = require('express').Router()
const { Post, User, Note } = require('../models')
const passport = require('passport')

// get all posts
router.get('/posts', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.findAll({ include: [User, Note] })
  res.json(posts)
})

//get one post 
router.get('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.findOne({ where: {id: req.params.id}, include: [User, Note] })
  res.json(posts)
})

//post one post
router.post('/posts', passport.authenticate('jwt'), async function(req, res) {
  const post = await Post.create({
    body: req.body.body,
    title: req.body.title,
    uid: req.user.id
  })
  res.json(posts)
})

//delete a post
router.delete('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  await Post.destroy({ where: {id: req.params.id } })
  res.sendStatus(200)
})

module.exports = router