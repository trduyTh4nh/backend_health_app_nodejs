'use strict'

const { SuccessResponse } = require("../core/success.response")
const { searchUserByUserName } = require("../models/repositories/user.repo")
const { updateProfileUser, getUserProfile, updateChangePassword, getAllUserFunc } = require("../service/user.service")

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

    getAllUser = async (req, res, next) => {
        new SuccessResponse({
            message: "get all user successfully!",
            metadata: await getAllUserFunc()
        }).send(res)
    }

    searchUser = async(req, res, next) => {
        new SuccessResponse({
            message: "Result search",
            metadata: await searchUserByUserName(req.query.searchKey)
        }).send(res)
    }
}

module.exports = new UserController()