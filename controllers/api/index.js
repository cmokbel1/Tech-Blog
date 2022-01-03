const router = require('express').Router()

router.use('/user', require('../userRoutes.js'))
router.use('/post', require('../postRoutes.js'))
router.use('/note', require('./noteRoutes.js'))

module.exports = router