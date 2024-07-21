'use strict'
const express = require('express')
const { authentication } = require('../../auth/auth')
const { asyncHandler } = require('../../helpers/async')
const addressController = require('../../controller/address.controller')
const router = express.Router()

router.use(authentication)
router.post('/addAddress', asyncHandler(addressController.addAddress))
router.put('/updateAddress', asyncHandler(addressController.updateAddress))
router.delete('/deleteAddress/:id_address', asyncHandler(addressController.deleteAddress))
router.get('/allAddressUser/:id_user', asyncHandler(addressController.getAllAddressUser))
module.exports = router