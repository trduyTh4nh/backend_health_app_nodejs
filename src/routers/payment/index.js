const express = require('express')
const { authentication } = require('../../auth/auth')
const { asyncHandler } = require('../../helpers/async')
const paymentController = require('../../controller/payment.controller')
const router = express.Router()

router.use(authentication)
router.post('/addPayment', asyncHandler(paymentController.pay))

module.exports = router