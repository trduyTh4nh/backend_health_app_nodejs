
'use strict'
const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const { BadRequestError } = require('../../core/error.response');
const DataTypes = require('sequelize').DataTypes;


const notificationModel = require('../notification.model')(sequelize, DataTypes)

const createNotification = async (
    content,
    time,
    id_user,
    iscomfirmed,
    priority,
    id_schedule_detail,
    id_invoice
) => {
    return await notificationModel.create({
        content,
        time,
        id_user,
        iscomfirmed,
        priority,
        id_schedule_detail,
        id_invoice
    })
}

const getAllNotification = async (id_user) => {
    return await notificationModel.findAll({
        where: { id_user }
    })
}

module.exports = {
    createNotification,
    getAllNotification
}