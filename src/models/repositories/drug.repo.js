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

const getDrugDetailById = async (id_app_detail) => {

    return await DrugApplicationDetail.findOne({
        where: { id_app_detail: id_app_detail }
    })
}

const getAllDrugApplicationDetail = async (id_app) => {
    const listDrugApplicationDetail = await DrugApplicationDetail.findAll({ where: { id_drug_application: id_app } })
    const listDrugAppDetail = []
    for (let index = 0; index < listDrugApplicationDetail.length; index++) {
        const idDrug = listDrugApplicationDetail[index].id_drug
        const drug = await drugModel.findOne({ where: { id_drug: idDrug } })

        var result = {
            ...listDrugApplicationDetail[index].dataValues,
            drug: drug
        }
        listDrugAppDetail.push(result)
    }


    return listDrugAppDetail
}

const getAllApplication = async (id_user) => {
    return await DrugApplication.findAll({ where: { id_user: id_user } })
}



module.exports = {
    getDrugApplicationByUser,
    getDrugApplicationDetailFrom,
    getScheduleDetailByAppDrugDetail,
    getDrugFromId,
    getDrugAppFromId,
    deleteScheduleDetail,
    getListApplicationDetailFrom,
    getDrugDetailById,
    getAllApplication,
    getAllDrugApplicationDetail

}