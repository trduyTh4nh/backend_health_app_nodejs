'use strict'

const { where } = require('sequelize');
const { Op } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const { NotFoundError, BadRequestError } = require('../../core/error.response');
const DataTypes = require('sequelize').DataTypes;
const drugModel = require('../drug.model')(sequelize, DataTypes);
const DrugApplication = require("../drugApplication.model")(sequelize, DataTypes);
const DrugApplicationDetail = require("../drugApplicationDetail.model")(sequelize, DataTypes);
const ScheduleDetail = require('../scheduleDetail.model')(sequelize, DataTypes)
const hospitalModel = require('../hospital.model')(sequelize, DataTypes)
const getDrugApplicationByUser = async (id_user) => {
    return await DrugApplication.findAll({ where: { id_user: id_user } })
}
const getDrugApplicationByIdApplication = async (id_app) => {
    return await DrugApplication.findAll({ where: { id: id_app } })
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


const getAllDrug = async () => {
    return await drugModel.findAll()
}


const searchDrug = async (text) => {
    try {
        const drugs = await drugModel.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${text}%`
                }
            }
        });
        return drugs;
    } catch (error) {
        console.error('Error searching for drugs:', error);
        throw new Error('Could not search for drugs');
    }
};

const decrementDrugUsed = async (id_app_detail) => {
    const foundApplicationDetail = await DrugApplicationDetail.findOne({
        where: { id_app_detail: id_app_detail }
    })

    if (!foundApplicationDetail) {
        throw new NotFoundError('Can not find application detail')
    }

    if (foundApplicationDetail.quantity_used <= 0) {
        throw new NotFoundError('Minium quantity! ')
    }

    await foundApplicationDetail.increment('quantity', {
        by: -1
    })
}

const getApplicationDetailById = async (id_app_detail) => {
    return await DrugApplicationDetail.findOne({
        where: { id_app_detail }
    })
}

const getApplicationByIdApplication = async (id) => {
    return await DrugApplication.findOne({
        where: { id }
    })
}


const scanDrugApplicationUpdate = async (id_user, id_application) => {
    const foundDrugApplication = await DrugApplication.findOne({
        where: { id: id_application }
    })

    // const foundUserInDrugApplication = await DrugApplication.findOne({

    //     where: { id_user: id_user }
    // })
    if (foundDrugApplication.id_user) {
        throw new BadRequestError('You does not have permission!')
    }

    return await DrugApplication.update({
        id_user
    }, {
        where: { id: id_application }
    })
}



// (thêm thuốc custom)
const createApplicationDetail = async ({
    id_drug,
    id_drug_application,
    amount_per_consumption,
    quantity
}) => {


    console.log("id_drug: ", id_drug)
    console.log("id_drug_application: ", id_drug_application)
    console.log("amount_per_consumption: ", amount_per_consumption)
    console.log("quantity: ", quantity)

    return await DrugApplicationDetail.create({
        id_drug,
        id_drug_application,
        quantity_used: 0,
        quantity,
        amount_per_consumption
    })
}

const incrementQuantityUsed = async (id_app_detail) => {
    try {
        const foundApplicationDetail = await DrugApplicationDetail.findOne({ where: { id_app_detail } });

        // Kiểm tra nếu không tìm thấy id_app_detail
        if (!foundApplicationDetail) {
            console.error(`No application detail found for id_app_detail: ${id_app_detail}`);
            throw new Error(`Application detail not found for id_app_detail: ${id_app_detail}`);
        }

        console.log("DEBUG APPLICATION DETAIL: ", foundApplicationDetail.id_app_detail);
        console.log("DEBUG APPLICATION DETAIL: ", foundApplicationDetail.quantity_used);

        // Sử dụng hàm increment để tăng quantity_used
        await foundApplicationDetail.increment('quantity_used', { by: 1 });


        await foundApplicationDetail.reload();

        console.log("UPDATED APPLICATION DETAIL: ", foundApplicationDetail.quantity_used);

        return foundApplicationDetail; // Trả về đối tượng đã được tăng
    } catch (error) {
        console.error(`Error incrementing quantity_used for id_app_detail: ${id_app_detail}`, error);
        throw new Error(`Error incrementing quantity_used: ${error.message}`);
    }
};

const getDrugFromDrugApplicationDetail = async (id_drug_application_detail) => {
    const foundDrugAppDetail = await DrugApplicationDetail.findOne({
        where: { id_app_detail: id_drug_application_detail }
    })

    if (!foundDrugAppDetail) {
        throw new NotFoundError('Not found drug application detail!')
    }

    const result = await drugModel.findOne({
        where: { id_drug: foundDrugAppDetail.id_drug }
    })
    return {
        ...foundDrugAppDetail.dataValues,
        drug: result
    }
}


const getAllHostpital = async () => {
    return await hospitalModel.findAll()
}

const searchHospital = async (keySearch) => {
    console.log("debug keySearch:", keySearch)
    try {
        const hospital = await hospitalModel.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${keySearch}%`
                }
            }
        })
        return hospital
    } catch (error) {
        throw new BadRequestError('Could not search user', error)
    }
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
    getAllDrugApplicationDetail,
    getAllDrug,
    searchDrug,
    getDrugApplicationByIdApplication,
    decrementDrugUsed,
    getApplicationDetailById,
    getApplicationByIdApplication,
    scanDrugApplicationUpdate,
    createApplicationDetail,
    incrementQuantityUsed,
    getDrugFromDrugApplicationDetail,
    getAllHostpital,
    searchHospital
}