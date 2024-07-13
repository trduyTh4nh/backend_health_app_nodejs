'use strict'
const express = require('express')
const { asyncHandler } = require('../../helpers/async')
const accessController = require('../../controller/access.controller')
const router = express.Router()

router.post('/register', asyncHandler(accessController.register))
router.post('/login', asyncHandler(accessController.login))

module.exports = router