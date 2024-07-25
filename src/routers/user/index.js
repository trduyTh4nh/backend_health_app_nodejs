'use strict'

const express = require('express')
const { asyncHandler } = require('../../helpers/async')
const userController = require('../../controller/user.controller')
const { authentication, authenticationVersion2 } = require('../../auth/auth')
const router = express.Router()

router.use(authentication)
router.put('/updateProfile/:id_user', asyncHandler(userController.updateProfile))
router.get('/getUserInformation/:id_user', asyncHandler(userController.getUserInformation))
router.put('/changePassword', asyncHandler(userController.updatePassword))
router.get('/getBestDisease', userController.getBestDiseaseOfMonth)
router.get('/getNumberDiseaseOfYear', userController.getNumberDiseaseOfYear)
router.get('/getTotalMoneyAllMonthOfYear', asyncHandler(userController.getTotalMoneyAllMonthInYear))
router.use(authenticationVersion2)
router.get('/getAllUser', asyncHandler(userController.getAllUser))
router.get('/searchUser', asyncHandler(userController.searchUser))
router.get('/getAllDisease', asyncHandler(userController.getAlldisease))


module.exports = router