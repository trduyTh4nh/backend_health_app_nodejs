'use strict'

const { BadRequestError, NotFoundError } = require("../core/error.response")
const { getAllApplication, getApplicationDetailById, getApplicationByIdApplication } = require("../models/repositories/drug.repo")
const { updateScheduleDetail, deleteScheduleDetail, addSchedileDetail, getAllScheleDetailFromIdDrugDetail, getAllScheduleWithSt, getScheduleDetailById } = require("../models/repositories/schedule.repo")
const { findUserById } = require("../models/repositories/user.repo")
const { isValidTimeFormat } = require("../utils")
const { insertLog } = require("./logs.service")

class ScheduleService {
    static updateStatusScheDetail = async (id_schedule_detail, payload) => {
        try {

            if (!id_schedule_detail) {
                throw new NotFoundError('id_schedule_detail not found')
            }
            const date_save = new Date().toLocaleDateString()
            const { id_user } = payload
            await insertLog({ id_schedule_detail, date_save, id_user })

          //  var scheduleDetail = await getScheduleDetailById(id_schedule_detail)

            // var applicationDetail = await getApplicationDetailById(scheduleDetail.id_app_detail)

            // var application = await getApplicationByIdApplication(applicationDetail.id_drug_application)

            // var id_user = application.id_user

            return await updateScheduleDetail(id_schedule_detail)
        } catch (error) {
            throw new BadRequestError(error)
        }
    }
    static deleteScheduleDetail = async (id_schedule_detail) => {
        try {
            if (!id_schedule_detail) {
                throw new NotFoundError('id_schedule_detail not found')
            }
            return await deleteScheduleDetail(id_schedule_detail)
        } catch (error) {
            throw new BadRequestError(error)
        }
    }
    static insertScheduleDetail = async (payload) => {
        try {
            console.log(payload)
            if (!payload) {
                throw new NotFoundError('Not found data to insert');
            }
            const { id_app_detail, id_schedule, quantity_used, time_use, status = false } = payload;

            if (!id_app_detail || !id_schedule || !quantity_used || !time_use) {
                throw new BadRequestError('Missing required fields');
            }
            if (!isValidTimeFormat(time_use)) {
                throw new BadRequestError('Not valid time!')
            }
            return await addSchedileDetail({ id_app_detail, id_schedule, status, quantity_used, time_use });

        } catch (error) {
            throw new BadRequestError(error)
        }
    }

    static getAllScheduleDetailFromIdDrugDetail = async (id_app_detail) => {
        try {
            return await getAllScheleDetailFromIdDrugDetail(id_app_detail)
        } catch (error) {
            throw new BadRequestError(error)
        }
    }


    // ĐANG LÀM
    static getAllScheduleWithStatus = async (id_user, body) => {
        const { status } = body
        try {
            const foundUser = await findUserById(id_user)
            if (!foundUser) {
                throw new NotFoundError('User not found!')
            }

            var result = await getAllScheduleWithSt(id_user, status)
            return result
        } catch (error) {
            throw new BadRequestError(error)
        }
    }
}

module.exports = ScheduleService