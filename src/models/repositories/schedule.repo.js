const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const { decrementDrugUsed } = require('./drug.repo');
const DataTypes = require('sequelize').DataTypes;
const scheduleModel = require('../schedule.model')(sequelize, DataTypes);
const scheduleDetailModel = require('../scheduleDetail.model')(sequelize, DataTypes);
const drugApplicationModel = require('../drugApplication.model')(sequelize, DataTypes);

const updateScheduleDetail = async (id_schedule_detail) => {
    const currentDate = new Date().toISOString();
    const scheduleDetail = await scheduleDetailModel.findOne({
        where: { id_schedule_detail }
    })

    // const foundApplicationDetailFromScheduleDetail = await drugApplicationModel.findOne({
    //     where: { id_app_detail: scheduleDetail.id_app_detail }
    // })


    await scheduleDetailModel.update(
        { last_confirm: currentDate },
        { where: { id_schedule_detail } }
    );

    // await decrementDrugUsed(scheduleDetail.id_app_detail)

    return await scheduleDetailModel.update(
        { status: true },
        { where: { id_schedule_detail: id_schedule_detail } }
    );
};


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

const getScheduleDetailById = async (id_schedule_detail) => {
    return await scheduleDetailModel.findOne({
        where: { id_schedule_detail }
    })
}


const createSchedule = async (id_user, id_drug_application) => {
    return scheduleModel.create({
        id_user,
        id_drug_application,
        status: false
    })
}

const findScheduleByDrugApplication = async (id_drug_application) => {
    return await scheduleModel.findOne({
        where: { id_drug_application }
    })
}

const createScheduleDetail = async ({ id_app_detail, id_schedule, listScheduleDetail }) => {
    for (let index = 0; index < listScheduleDetail.length; index++) {
        const schedule = listScheduleDetail[index];
        console.log("DEBUG: " + schedule)
    }

    const scheduleDetails = listScheduleDetail.map(time_use => ({
        id_app_detail,
        id_schedule,
        status: false,
        quantity_used: 0,
        time_use
    }));

    // bulkCreate có thể tạo nhiều bảng ghi một lúc
    return await scheduleDetailModel.bulkCreate(scheduleDetails);
};

const findScheduleDetailById = async (id_schedule_detail) => {
    return await scheduleDetailModel.findOne({
        where: { id_schedule_detail }
    })
}

const findIdScheduleFromAppDetail = async (id_app_detail) => {
    const findScheduleDetail = await scheduleDetailModel.findOne({
        where: { id_app_detail }
    })
    return findScheduleDetail.id_schedule
}


const findIdApplicationDetail = async (id_schedule_detail) => {

    return await scheduleDetailModel.findOne({
        where: { id_schedule_detail }
    })
}



module.exports = {
    updateScheduleDetail,
    deleteScheduleDetail,
    addSchedileDetail,
    getAllScheleDetailFromIdDrugDetail,
    getAllScheduleWithSt,
    getScheduleDetailById,
    createSchedule,
    findScheduleByDrugApplication,
    createScheduleDetail,
    findScheduleDetailById,
    findIdScheduleFromAppDetail,
    findIdApplicationDetail
}