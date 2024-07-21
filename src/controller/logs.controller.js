'use strict'

const { SuccessResponse } = require("../core/success.response")
const LogService = require("../service/logs.service")

class LogController {
    insertLog = async (req, res, next) => {

        new SuccessResponse({
            message: "Insert log successfully!",
            metadata: await LogService.insertLog(req.body)
        }).send(res)
    }

    getAllLogs = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all logs successfully!",
            metadata: await LogService.getAllLog(req.params.id_user) 
        }).send(res)
    }
}

module.exports = new LogController()