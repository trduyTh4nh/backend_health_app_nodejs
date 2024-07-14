'use strict'
const sequelize = require('../../db/init.sequelize');
const DataTypes = require('sequelize').DataTypes;

const usertokenModel = require('../userToken.model')(sequelize, DataTypes);



const getTokenUser = async (id_user) => {
    return await usertokenModel.findOne({ where: { user_id: id_user } })
}

const deleteToken = async (id_user) => {
    return await usertokenModel.destroy({ where: { user_id: id_user } })
}

module.exports = {
    getTokenUser,
    deleteToken
} 