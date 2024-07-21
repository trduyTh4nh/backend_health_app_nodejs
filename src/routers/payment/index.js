const express = require('express')
const { authentication } = require('../../auth/auth')
const router = express.Router()

router.use(authentication)


module.exports = router