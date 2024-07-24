'use strict'
const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const { BadRequestError, NotFoundError } = require('../../core/error.response');
const { findAddressById } = require('./address.repo');
const { getDrugAppFromId, getDrugFromId } = require('./drug.repo');
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


const getInvoiceDetail = async (id_invoice) => {
    return await invoiceDetail.findAll({
        where: id_invoice
    })
}

const getInvoiceUser = async (id_user) => {

    const listInvoice = await invoiceModel.findAll({
        where: { id_user: id_user }
    })

    // if(!invoice){
    //     throw new NotFoundError('Not found invoice of user')
    // }
    const listResult = []
    for (let i = 0; i < listInvoice.length; i++) {
        var invoice = listInvoice[i]


        var dataInvoiceDetail = await invoiceDetail.findAll({
            where: { id_invoice: invoice.id_invoice }
        })

        for (let k = 0; k < dataInvoiceDetail.length; k++) {
            const drug = await getDrugAppFromId(dataInvoiceDetail[k].id_drug)

            dataInvoiceDetail[k] = {
                ...dataInvoiceDetail[k].dataValues,
                drug: drug
            }
        }

        var address = await findAddressById(invoice.id_address)
        var result = {
            ...invoice.dataValues,
            address: address.dataValues,
            listInvoiceDetail: dataInvoiceDetail,
        }

        listResult.push(result);
    }


    // const result = {
    //     ...invoice.dataValues,
    //     listInvoiceDetail: listInvoiceDetail
    // }

    return listResult

}

// const getInvoiceByIdInvoice = async(id_invoice) => {


// }


const getInvoiceById = async (id_invoice) => {

    console.log('Fetching invoice with id:', id_invoice);
    const invoice = await invoiceModel.findOne({
        where: { id_invoice }
    });

    if (!invoice) {
        throw new NotFoundError('Invoice not found');
    }

    // Ensure invoiceDetail is correctly imported and defined
    console.log('Fetching invoice details for invoice id:', invoice.id_invoice);

    const listInvoiceDetail = await getInvoiceDetail(invoice.id_invoice)

    var listResult = [];
    for (let i = 0; i < listInvoiceDetail.length; i++) {
        var invoiceDetail = listInvoiceDetail[i];
        var drug = await getDrugFromId(invoiceDetail.id_drug);

        listResult.push({
            invoiceDetail,
            drug
        });
    }

    return {
        ...invoice.dataValues,
        listResult
    };

};

module.exports = {
    getAllPaymentOfUser,
    insertPaymentInfo,
    createInvoice,
    insertListInvoiceDetail,
    getAllInvoice,
    getInvoiceById,
    getInvoiceUser
}

