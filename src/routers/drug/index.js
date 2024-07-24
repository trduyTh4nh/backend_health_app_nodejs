'use strict'

const express = require('express')
const router = express.Router()
const { authentication, authenticationVersion2 } = require('../../auth/auth')
const { asyncHandler } = require('../../helpers/async')
const drugController = require('../../controller/drug.controller')

router.use(authentication)

router.get('/getAllDrugBy/:id_user', asyncHandler(drugController.getAllDrugByUser))
router.delete('/deleteDrugFromDrugApplication', asyncHandler(drugController.deleteDrugFromApplication))
router.get('/getDrugAppDetailById/:id_app_drug_detail', asyncHandler(drugController.getDrugAppDetailById))
router.get('/getAllApplication/:id_user', asyncHandler(drugController.getAllDrugApplication))
router.get('/getAllApplicationDetail/:id_app', asyncHandler(drugController.getApplicationDetailByIdApp))
router.get('/getAllDrugSystem', asyncHandler(drugController.getAllDrugSystem))
router.get('/searchDrug', asyncHandler(drugController.searchFunction))
router.get('/getAllDrugAppBy/:id_app', asyncHandler(drugController.getAllApplicationByIdApplication))
router.put('/scan', asyncHandler(drugController.scanDrugApplication))
router.post('/addDrugCustom', asyncHandler(drugController.addDrugCustomNotification))
router.get('/getDrugFromDetail', asyncHandler(drugController.getDrugFromDrugAppDetail))

router.use(authenticationVersion2)
router.get('/getAllHospital', asyncHandler(drugController.getAllHospital))
router.get('/searchHospital', asyncHandler(drugController.searchHospital))

module.exports = router 