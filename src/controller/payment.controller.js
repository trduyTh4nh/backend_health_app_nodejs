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
}

module.exports = new PaymentController()