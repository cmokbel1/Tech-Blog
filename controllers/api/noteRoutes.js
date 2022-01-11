const router = require('express').Router()
const { Post, User, Note } = require('../../models')
const passport = require('passport')

// get comments
router.get('/notes', passport.authenticate('jwt'), async function (req, res) {
  const notes = await Note.findAll({ include: [User, Post] })
  res.json(notes)
})

//post a comment
router.post('/:id', passport.authenticate('jwt'), async function (req, res)  {
  const note = await Note.create({
    body: req.body.body,
    pid: req.body.pid,
    uid: req.session.userId,
    username: req.session.username
  })
  res.json(note)
})

module.exports = router