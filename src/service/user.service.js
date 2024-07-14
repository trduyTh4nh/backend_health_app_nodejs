'use strict'
const sequelize = require('../db/init.sequelize')
const DataTypes = require('sequelize').DataTypes;

const User = require('../models/user.model')(sequelize, DataTypes)
const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } })
}

const findUserByUserName = async (username) => {
    return await User.findOne({ where: { username } })
}

const updateProfileUser = async (payload) => {
    const { name, height, weight, age, gender, address, id_user } = payload
}

module.exports = {
    findUserByEmail,
    findUserByUserName
}