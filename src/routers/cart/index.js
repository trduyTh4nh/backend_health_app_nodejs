'use strict'
const express = require('express')
const router = express.Router()
const { asyncHandler } = require('../../helpers/async')
const cartController = require('../../controller/cart.controller')
router.post('/insertCart/:id_user', asyncHandler(cartController.insertCart))
router.post('/insertDrugIntoCart', asyncHandler(cartController.insertDrugIntoCart))
router.post('/updateQuantityCartDetail', asyncHandler(cartController.updateQuantityCartDetail))
router.get('/getAllDrugInCart/:id_user', asyncHandler(cartController.getAllProductInCart))
router.delete('/deleteDrugInCart/:id_cart_detail', asyncHandler(cartController.removeDrugInCart))
module.exports = router 