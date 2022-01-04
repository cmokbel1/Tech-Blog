const router = require('express').Router()
const { Post, User, Note } = require('../../models')
const passport = require('passport')

// // get all posts
// router.get('/posts', passport.authenticate('jwt'), async function (req, res) {
//   const posts = await Post.findAll({ include: [User, Note] })
//   res.json(posts)
// })

// //get one post 
// router.get('/:id', passport.authenticate('jwt'), async function (req, res) {
//   const posts = await Post.findOne({ where: {id: req.params.id}, include: [User, Note] })
//   res.json(posts)
// })

//post one post
router.post('/', passport.authenticate('jwt'), async function(req, res) => {
  const post = await Post.create({
    body: req.body.body,
    title: req.body.title,
    uid: req.session.userId
  })
  res.json(post)
})

///edit a ppost n shit
router.put('/:id', passport.authenticate('jwt'), async function(req, res) => {
  const post = await Post.update({
    body: req.body.body,
    title: req.body.title},
    {where: {id:req.params.id}})
    res.json(post)
  })

//delete a post or comment
router.delete('/:id', passport.authenticate('jwt'), async function (req, res) => {
  let post = await Post.destroy({ where: {id: req.params.id, uid: req.session.userId } })

  if(post > 0) {
    let notes = await Note.destroy({where : {uid: req.params.id}})
  }
  res.sendStatus(200)
})

module.exports = router