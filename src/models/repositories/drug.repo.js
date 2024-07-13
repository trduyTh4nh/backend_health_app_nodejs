'use strict'
const DrugApplication = require("../drugApplication.model");
const DrugApplicationDetail = require("../drugApplicationDetail.model");

const getDrugApplicationByUser = async (id_user) => {
    return await DrugApplication.findAll({ where: { id_user: id_user } })
}
const getDrugApplicationDetailFrom = async (id_drug_app) => {
    return await DrugApplicationDetail.findAll({ where: { id_drug_application: id_drug_app } })
}

module.exports = {
    getDrugApplicationByUser,
    getDrugApplicationDetailFrom
}