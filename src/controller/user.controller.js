'use strict'

const { SuccessResponse } = require("../core/success.response")
const { updateProfileUser, getUserProfile, updateChangePassword } = require("../service/user.service")

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

    updatePassword = async (req, res, next) => {
        new SuccessResponse({
            message: "Update password successfully!",
            metadata: await updateChangePassword(req.body)
        }).send(res)
    }
}

module.exports = new UserController()