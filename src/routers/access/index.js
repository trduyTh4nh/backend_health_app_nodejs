'use strict'
const express = require('express')
const { asyncHandler } = require('../../helpers/async')
const accessController = require('../../controller/access.controller')
const { authentication } = require('../../auth/auth')
const router = express.Router()

router.get('/verify', asyncHandler(accessController.verificationEmail))
router.post('/register', asyncHandler(accessController.register))
router.post('/login', asyncHandler(accessController.login))
router.post('/resendOpt', asyncHandler(accessController.resendEmail))
router.use(authentication)
router.post('/logout', asyncHandler(accessController.logout))
module.exports = router