'use strict'
const sequelize = require('../../db/init.sequelize');
const { NotFoundError, BadRequestError } = require('../../core/error.response');
const { where } = require('sequelize');
const DataTypes = require('sequelize').DataTypes;
const addressModel = require('../address.model')(sequelize, DataTypes)

const createAddress = async (id_user, address) => {
    return await addressModel.create({
        id_user,
        address
    })
}

const updateAddress = async (id_address, address) => {
    if (!id_address) {
        throw new NotFoundError('Not found address!')
    }

    return await addressModel.update({
        address
    }, { where: { id_address } })
}

const findAddressById = async (id_address) => {
    return addressModel.findOne({
        where: { id_address }
    })
}

const deleteAddressById = async (id_address) => {
    return addressModel.destroy({
        where: { id_address }
    })
}

module.exports = {
    createAddress,
    updateAddress,
    findAddressById, 
    deleteAddressById
}