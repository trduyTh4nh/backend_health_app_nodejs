'use strict'
const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const { BadRequestError } = require('../../core/error.response');
const DataTypes = require('sequelize').DataTypes;

const paymentInfoModel = require("../paymentInfo.model")(sequelize, DataTypes)
const invoiceModel = require("../invoice.model")(sequelize, DataTypes)
const invoiceDetail = require("../invoiceDetail.model")(sequelize, DataTypes)

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

const createInvoice = async ({
    id_user,
    create_date,
    total_price,
    status,
    notes,
    id_address,
    id_paypal
}) => {
    return await invoiceModel.create({
        id_user,
        create_date,
        total_price,
        status,
        notes,
        id_address,
        id_paypal
    })
}

const insertListInvoiceDetail = async ({ listDrugCart, id_invoice }) => {
    try {

        const listInvoiceDetail = listDrugCart.map(item => ({
            id_drug: item.id_drug,
            quantity: item.quantity,

            id_invoice
        }));

        const result = await invoiceDetail.bulkCreate(listInvoiceDetail);

        return result;
    } catch (error) {
        throw new BadRequestError(error);
    }
};

const getAllInvoice = async (id_user) => {
    return await invoiceModel.findAll({
        where: { id_user }
    })
}

const getInvoiceById = async (id_invoice) => {
    return await invoiceModel.findOne({
        where: { id_invoice }
    })
}

module.exports = {
    getAllPaymentOfUser,
    insertPaymentInfo,
    createInvoice,
    insertListInvoiceDetail,
    getAllInvoice,
    getInvoiceById
}

