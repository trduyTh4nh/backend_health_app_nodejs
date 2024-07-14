'use strict'

const { BadRequestError, NotFoundError } = require("../core/error.response")
const { updateScheduleDetail, deleteScheduleDetail, addSchedileDetail } = require("../models/repositories/schedule.repo")
const { isValidTimeFormat } = require("../utils")

class ScheduleService {
    static updateStatusScheDetail = async (id_schedule_detail) => {
        try {
            if (!id_schedule_detail) {
                throw new NotFoundError('id_schedule_detail not found')

            }
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



            if (!payload) {
                throw new NotFoundError('Not found data to insert');
            }
            const { id_app_detail, id_schedule, quantity_used, time_use, status = false } = payload;

            // console.log("id_app_detail: ", id_app_detail)
            // console.log("id_schedule: ", id_schedule)
            // console.log("quantity_used: ", quantity_used)
            // console.log("time_use: ", time_use)
            // console.log("status: ", status)
            if (!id_app_detail || !id_schedule || !quantity_used || !time_use) {
                throw new BadRequestError('Missing required fields');
            }

            if(!isValidTimeFormat(time_use)){
                throw new BadRequestError('Not valid time!')
            }   

            return await addSchedileDetail({ id_app_detail, id_schedule, status, quantity_used, time_use });

        } catch (error) {
            throw new BadRequestError(error)
        }
    }
}

module.exports = ScheduleService