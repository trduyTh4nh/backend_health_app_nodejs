const express = require('express')
const router = express.Router()


router.use('/v1/api/access', require('../access'))
router.use('/v1/api/drug', require('../drug'))
module.exports = router 