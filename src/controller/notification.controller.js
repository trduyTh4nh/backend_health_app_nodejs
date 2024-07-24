'use strict'

const { SuccessResponse } = require("../core/success.response")
const NotificationService = require("../service/notification.service")

class NotificationController {
    notify = async (req, res, next) => {
        new SuccessResponse({
            message: 'Notify successfully!',
            metadata: await NotificationService.notify(req.body)
        }).send(res)
    }

    getAllNotification = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all notify successfully!",
            metadata: await NotificationService.getAllNotificationUser(req.params.id_user)
        }).send(res)
    }

    removeNotification = async (req, res, next) => {
        new SuccessResponse({
            message: "Remove notification successfully!",
            metadata: await NotificationService.deleteNotification(req.params.id_notify)
        }).send(res)
    }
    
}

module.exports = new NotificationController()