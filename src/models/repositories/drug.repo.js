'use strict'

const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const DataTypes = require('sequelize').DataTypes;
const drugModel = require('../drug.model')(sequelize, DataTypes);
const DrugApplication = require("../drugApplication.model")(sequelize, DataTypes);
const DrugApplicationDetail = require("../drugApplicationDetail.model")(sequelize, DataTypes);
const ScheduleDetail = require('../scheduleDetail.model')(sequelize, DataTypes)
const getDrugApplicationByUser = async (id_user) => {
    return await DrugApplication.findAll({ where: { id_user: id_user } })
}
const getDrugApplicationDetailFrom = async (id_drug_app) => {
    return await DrugApplicationDetail.findAll({ where: { id_drug_application: id_drug_app } })
}

const getScheduleDetailByAppDrugDetail = async (id_app_detail) => {
    return await ScheduleDetail.findAll({ where: { id_app_detail: id_app_detail } })
}

const getDrugFromId = async (id_drug) => {
    return await drugModel.findOne({
        where: { id_drug: id_drug }
    })
}



const getDrugAppFromId = async (id_drug_app) => {
    return await DrugApplication.findOne({ where: { id: id_drug_app } })
}

const deleteScheduleDetail = async (id_app_detail) => {

    return await DrugApplicationDetail.destroy({
        where: { id_app_detail: id_app_detail }
    })
}

const getListApplicationDetailFrom = async (id_drug_app) => {
    return await DrugApplicationDetail.findAll({
        where: { id_drug_application: id_drug_app }
    })
}

module.exports = {
    getDrugApplicationByUser,
    getDrugApplicationDetailFrom,
    getScheduleDetailByAppDrugDetail,
    getDrugFromId,
    getDrugAppFromId,
    deleteScheduleDetail,
    getListApplicationDetailFrom
}