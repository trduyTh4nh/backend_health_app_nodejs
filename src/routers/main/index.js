const express = require('express')
const router = express.Router()


router.use('/v1/api/access', require('../access'))
router.use('/v1/api/drug', require('../drug'))
router.use('/v1/api/schedule', require('../schedule'))

module.exports = router 