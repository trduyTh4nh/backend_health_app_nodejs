const express = require('express')
const { authentication } = require('../../auth/auth')
const { asyncHandler } = require('../../helpers/async')
const paymentController = require('../../controller/payment.controller')
const router = express.Router()

router.use(authentication)
router.post('/addPayment', asyncHandler(paymentController.pay))
router.get('/getAllInvoice/:id_user', asyncHandler(paymentController.getAllInvoice))
router.get('/getAllOrder/:id_user', asyncHandler(paymentController.getAllOrder))
router.get('/getInvoice/:id_invoice', asyncHandler(paymentController.getInvoiceById))
router.put('/updateInvoiceStatus', asyncHandler(paymentController.updateInvoiceStatus))
router.put('/updateDestroyInvoice', asyncHandler(paymentController.updateDestroyInvoice))
module.exports = router