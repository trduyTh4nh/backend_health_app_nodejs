'use strict'

const { SuccessResponse } = require("../core/success.response")
const ScheduleService = require("../service/schedule.service")

class ScheduleController {
    updateScheDetail = async (req, res, next) => {
        new SuccessResponse({
            message: "Update schedule detail successfully!",
            metadata: await ScheduleService.updateStatusScheDetail(req.params.id_schedule_detail)
        }).send(res)
    }

    deleteScheduleDetail = async (req, res, next) => {
        new SuccessResponse({
            message: "Delete successfully!",
            metadata: await ScheduleService.deleteScheduleDetail(req.params.id_schedule_detail)
        }).send(res)
    }

    insertScheduleDetail = async (req, res, next) => {
        new SuccessResponse({
            message: "Insert successfully!",
            metadata: await ScheduleService.insertScheduleDetail(req.body)
        }).send(res)
    }
    getAllScheduleDetailFromIdDrugDetail = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all schedule successfully!",
            metadata: await ScheduleService.getAllScheduleDetailFromIdDrugDetail(req.params.id_app_detail)
        }).send(res)
    }

    
}

module.exports = new ScheduleController()


