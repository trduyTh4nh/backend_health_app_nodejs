'use strict'
const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const DataTypes = require('sequelize').DataTypes;

const paymentInfoModel = require("../paymentInfo.model")(sequelize, DataTypes)


const getAllPaymentOfUser = async (id_user) => {
    return paymentInfoModel.findAll({ where: { id_user } })
}

const insertPaymentInfo = async ({
    id_user,
    name_pay,
    num_pay,
}) => {
    var result = await paymentInfoModel.create({
        id_user,
        name_pay,
        num_pay,
    })
    return result
}

s


module.exports = {
    getAllPaymentOfUser,
    insertPaymentInfo
}

