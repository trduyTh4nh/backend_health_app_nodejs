'use strict'

const { BadRequestError, NotFoundError } = require("../core/error.response")
const { getAllApplication, getApplicationDetailById, getApplicationByIdApplication, incrementQuantityUsed } = require("../models/repositories/drug.repo")
const { updateScheduleDetail, deleteScheduleDetail, addSchedileDetail, getAllScheleDetailFromIdDrugDetail, getAllScheduleWithSt, getScheduleDetailById, findIdScheduleFromAppDetail } = require("../models/repositories/schedule.repo")
const { findUserById } = require("../models/repositories/user.repo")
const { isValidTimeFormat } = require("../utils")
const { insertLog } = require("./logs.service")

class ScheduleService {
    static updateStatusScheDetail = async (id_schedule_detail, payload) => {
        try {
            // Kiểm tra id_schedule_detail
            if (!id_schedule_detail) {
                throw new NotFoundError('id_schedule_detail not found');
            }


            // Lấy id_user từ payload
            const { id_user } = payload;
            if (!id_user) {
                throw new BadRequestError('id_user is required');
            }

            // Lưu log với thời gian hiện tại
            const date_save = new Date().toLocaleDateString();
            await insertLog({ id_schedule_detail, date_save, id_user });

            // Lấy thông tin chi tiết của schedule
            const findScheduleDetail = await getScheduleDetailById(id_schedule_detail);
            if (!findScheduleDetail) {
                throw new NotFoundError('Schedule detail not found');
            }

            // Tăng số lượng thuốc đã sử dụng lên 1
            await incrementQuantityUsed(findScheduleDetail.id_app_detail);

            // Cập nhật trạng thái của schedule
            const updatedScheduleDetail = await updateScheduleDetail(id_schedule_detail);
            if (!updatedScheduleDetail) {
                throw new BadRequestError('Failed to update schedule detail');
            }

            return updatedScheduleDetail;
        } catch (error) {
            console.error('Error in updateStatusScheDetail:', error);
            throw new BadRequestError(error.message);
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
        console.log(payload)
        if (!payload) {
            throw new NotFoundError('Not found data to insert');
        }
        const { id_app_detail, id_schedule, quantity_used, time_use, status = false } = payload;


        if (!id_app_detail || !quantity_used || !time_use) {
            throw new BadRequestError('Missing required fields');
        }


        if (!isValidTimeFormat(time_use)) {
            throw new BadRequestError('Not valid time!')
        }

        if (!id_schedule) {
            const idSchedule = await findIdScheduleFromAppDetail(id_app_detail)

            console.log("DEBUG idSchedule: ", idSchedule)
            return await addSchedileDetail({
                id_app_detail,
                id_schedule: idSchedule,
                status,
                quantity_used, time_use
            });

        }
        return await addSchedileDetail({ id_app_detail, id_schedule, status, quantity_used, time_use });

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