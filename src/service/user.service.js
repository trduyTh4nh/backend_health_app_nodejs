'use strict'
const { where } = require('sequelize');
const sequelize = require('../db/init.sequelize')
const DataTypes = require('sequelize').DataTypes;

const User = require('../models/user.model')(sequelize, DataTypes)

const { NotFoundError, BadRequestError } = require('../core/error.response');
const S3Service = require('./s3AWS.service');
const { updateProfile, getUserAndProfile } = require('../models/repositories/user.repo');
const { REQUESTED_RANGE_NOT_SATISFIABLE } = require('../utils/statusCode');

const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } })
}

const findUserByUserName = async (username) => {
    return await User.findOne({ where: { username } })
}

const updateProfileUser = async (payload, req, res, id_user) => {
    const { name, height, weight, age, gender, address } = payload
    const foundUser = await findUserById(id_user)
    if (!foundUser) {
        throw new NotFoundError('User not found!')
    }

    const uploadAvatar = await S3Service.uploadFileToS3(req, res)

    if (uploadAvatar.result !== 1) {
        throw new BadRequestError('Fail to upload avatar!')
    }

    var avatar
    if (uploadAvatar.files.singlefile) {
        avatar = uploadAvatar.files.singlefile[0].location
    }
   

    const updatedUser = await updateProfile(id_user, {
        height: req.body.height,
        weight: req.body.weight,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        avatar: avatar
    })

    if (!updatedUser) {
        throw new BadRequestError("Failed to update user profile!")
    }
    return updatedUser
}

const findUserById = async (id_user) => {
    return await User.findOne({ where: { id_user } })
}

const getUserProfile = async (id_user) => {
    const foundUser = await findUserById(id_user)
    if (!foundUser) {
        throw new NotFoundError('User not found!')
    }
    const result = await getUserAndProfile(id_user)
    return result
}

module.exports = {
    findUserByEmail,
    findUserByUserName,
    findUserById,
    updateProfileUser,
    getUserProfile
}