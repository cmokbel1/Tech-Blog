const router = require('express').Router();

router.use('/', require('./homeRoutes.js'))
router.use('/api', require('./api'))

module.exports = router