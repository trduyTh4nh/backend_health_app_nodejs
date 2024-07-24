const express = require('express')
const { authentication } = require('../../auth/auth')
const { asyncHandler } = require('../../helpers/async')
const notificationController = require('../../controller/notification.controller')
const router = express.Router()

router.use(authentication)
router.post('/createNotification', asyncHandler(notificationController.notify))
router.get('/getAllNotification/:id_user', asyncHandler(notificationController.getAllNotification))
module.exports = router