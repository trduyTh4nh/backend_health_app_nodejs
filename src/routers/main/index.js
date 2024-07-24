const express = require('express')
const uploadController = require("../../controller/upload.controller")
const { asyncHandler } = require('../../helpers/async')
const router = express.Router()


router.use('/v1/api/access', require('../access'))
router.use('/v1/api/drug', require('../drug'))
router.use('/v1/api/schedule', require('../schedule'))
router.use('/v1/api/cart', require('../cart'))
router.use('/v1/api/address', require('../address'))
router.use('/v1/api/user', require('../user'))
router.use('/v1/api/log', require('../logs'))
router.use('/v1/api/payment', require('../payment'))
router.use('/v1/api/notification', require('../notification'))

// special api
router.post('/v1/api/image-upload', asyncHandler(uploadController.uploadFile))
module.exports = router 