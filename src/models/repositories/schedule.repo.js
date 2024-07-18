const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const DataTypes = require('sequelize').DataTypes;
const scheduleModel = require('../schedule.model')(sequelize, DataTypes);
const scheduleDetailModel = require('../scheduleDetail.model')(sequelize, DataTypes);

const updateScheduleDetail = async (id_schedule_detail) => {
    return await scheduleDetailModel.update({ status: true }, { where: { id_schedule_detail: id_schedule_detail } })
}

const deleteScheduleDetail = async (id_schedule_detail) => {
    return await scheduleDetailModel.destroy({ where: { id_schedule_detail: id_schedule_detail } })
}

const addSchedileDetail = async ({
    id_app_detail,
    id_schedule,
    status = false,
    quantity_used,
    time_use
}) => {

    return await scheduleDetailModel.create({
        id_app_detail: id_app_detail,
        id_schedule: id_schedule,
        status: status,
        quantity_used: quantity_used,
        time_use: time_use
    })

}

const getAllScheleDetailFromIdDrugDetail = async (id_app_detail) => {
    return await scheduleDetailModel.findAll({ where: { id_app_detail: id_app_detail } })
}

const getAllScheduleWithSt = async (id_user, status) => {

    if (status == false || status == true) {
        return scheduleModel.findAll({ where: { id_user: id_user, status: status } })
    }
    else {
        return scheduleModel.findAll({ where: { id_user: id_user } })
    }

}


module.exports = {
    updateScheduleDetail,
    deleteScheduleDetail,
    addSchedileDetail,
    getAllScheleDetailFromIdDrugDetail,
    getAllScheduleWithSt
}