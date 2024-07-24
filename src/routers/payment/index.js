const express = require('express')
const { authentication } = require('../../auth/auth')
const { asyncHandler } = require('../../helpers/async')
const paymentController = require('../../controller/payment.controller')
const router = express.Router()

router.use(authentication)
router.post('/addPayment', asyncHandler(paymentController.pay))
router.get('/getAllInvoice/:id_user', asyncHandler(paymentController.getAllInvoice))
module.exports = router