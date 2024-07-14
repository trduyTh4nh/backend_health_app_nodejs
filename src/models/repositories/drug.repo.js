'use strict'

const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const DataTypes = require('sequelize').DataTypes;

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
    console.log("id_app_detail ", id_app_detail)
    return await ScheduleDetail.findAll({ where: { id_app_detail: id_app_detail } })
}

module.exports = {
    getDrugApplicationByUser,
    getDrugApplicationDetailFrom,
    getScheduleDetailByAppDrugDetail
}