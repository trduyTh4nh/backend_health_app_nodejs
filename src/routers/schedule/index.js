const express = require('express')
const { asyncHandler } = require('../../helpers/async')
const scheduleController = require('../../controller/schedule.controller')
const { authentication } = require('../../auth/auth')
const router = express.Router()

router.use(authentication)
router.put('/updateScheduleDetail/:id_schedule_detail', asyncHandler(scheduleController.updateScheDetail))
router.delete('/deleteScheduleDetail/:id_schedule_detail', asyncHandler(scheduleController.deleteScheduleDetail))
router.post('/insertScheduleDetail', asyncHandler(scheduleController.insertScheduleDetail))
module.exports = router
