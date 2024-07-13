'use strict'

const { CREATED, SuccessResponse } = require('../core/success.response')
const AccessService = require('../service/access.service')

class AccessController {
    register = async (req, res, next) => {
        new CREATED({
            message: "Register successfully!",
            metadata: await AccessService.register(req.body),
        }).send(res)
    }

    login = async (req, res, next) => {
        new SuccessResponse({
            message: "Login successfully!",
            metadata: await AccessService.login(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()