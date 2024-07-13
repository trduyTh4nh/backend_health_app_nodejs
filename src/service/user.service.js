'use strict'

const userModel = require('../models/user.model')

const findUserByEmail = async (email) => {
    return await userModel.findOne({ where: { email } })
}

const findUserByUserName = async (username) => {
    return await userModel.findOne({ where: { username } })
}
module.exports = {
    findUserByEmail,
    findUserByUserName
}