'use strict'

const express = require('express')
const router = express.Router()
const { authentication } = require('../../auth/auth')
const { asyncHandler } = require('../../helpers/async')
const drugController = require('../../controller/drug.controller')

router.use(authentication)

router.get('/getAllDrugBy/:id_user', asyncHandler(drugController.getAllDrugByUser))
// cái này xóa thuốc trong trang có lịch thuốc chi tiết
router.delete('/deleteDrugFromDrugApplication', asyncHandler(drugController.deleteDrugFromApplication))
router.get('/getDrugAppDetailById/:id_app_drug_detail', asyncHandler(drugController.getDrugAppDetailById))

module.exports = router 