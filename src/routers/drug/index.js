'use strict'

const express = require('express')
const router = express.Router()
const { authentication } = require('../../auth/auth')
const { asyncHandler } = require('../../helpers/async')
const drugController = require('../../controller/drug.controller')

router.use(authentication)
router.get('/getAllDrugBy/:id_user', asyncHandler(drugController.getAllDrugByUser))

module.exports = router 