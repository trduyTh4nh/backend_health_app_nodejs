'use strict'

const { SuccessResponse } = require("../core/success.response")
const { updateProfileUser, getUserProfile } = require("../service/user.service")

class UserController {
    updateProfile = async (req, res, next) => {
        new SuccessResponse({
            message: "Update profile successfully!",
            metadata: await updateProfileUser(req.body, req, res, req.params.id_user)
        }).send(res)
    }
    getUserInformation = async (req, res, next) => {
        new SuccessResponse({
            message: "Get user information successfully!",
            metadata: await getUserProfile(req.params.id_user)
        }).send(res)
    }
}

module.exports = new UserController()