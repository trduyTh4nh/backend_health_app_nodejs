'use strict'

const { SuccessResponse } = require("../core/success.response")
const PaymentService = require("../service/payment.service")

class PaymentController {
    pay = async (req, res, next) => {
        new SuccessResponse({
            message: "Payment successfully!",
            metadata: await PaymentService.pay(req.body)
        }).send(res)
    }

    getAllInvoice = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all invoice successfully!",
            metadata: await PaymentService.getAllInvoiceOfUser(req.params.id_user)
        }).send(res)
    }
    getAllOrder = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all order successfully!",
            metadata: await PaymentService.getOrderUser(req.params.id_user)
        }).send(res)
    }

    getInvoiceById = async (req, res, next) => {
        new SuccessResponse({
            message: "Get invoice successfully!",
            metadata: await PaymentService.getInvoiceById(req.params.id_invoice)
        }).send(res)
    }

    updateInvoiceStatus = async (req, res, next) => {
        new SuccessResponse({
            message: "Update status successfully!",
            metadata: await PaymentService.updateInvoice(req.body)
        }).send(res)
    }
}

module.exports = new PaymentController()