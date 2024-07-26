
const { where, Op } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const { getInfoData } = require('../../utils');
const { NotFoundError, BadRequestError } = require('../../core/error.response');
const { findUserByEmail } = require('../../service/user.service');
const DataTypes = require('sequelize').DataTypes;

const User = require('../user.model')(sequelize, DataTypes)
const Cart = require('../cart.model')(sequelize, DataTypes)
const Profile = require('../profile.model')(sequelize, DataTypes)
const findUserById = async (id_user) => {
    return await User.findOne({ where: { id_user: id_user } })
}


const findUserInCart = async (id_user) => {
    return await Cart.findOne({ where: { id_user } })
}

const createProfile = async (id_user) => {
    return await Profile.create({
        id_user
    })
}

const updateProfile = async (id_user,
    {
        height,
        weight,
        age,
        gender,
        address,
        avatar,
        phone,
        full_name
    }
) => {

    return await Profile.update({
        height,
        weight,
        age,
        gender,
        address,
        avatar,
        phone,
        full_name
    }, {
        where: { id_user: id_user }
    })
}


const getUserAndProfile = async (id_user) => {

    const user = await User.findOne({ where: { id_user } })

    const profile = await Profile.findOne({ where: { id_user: id_user } })
    const infodata = getInfoData({
        fields: [
            'id_user',
            'username',
            'email'
        ], object: user.dataValues
    })
    return {
        ...infodata,
        profile: profile
    }
}


const updatePassword = async (id_user, repass) => {

    const foundUser = await User.findOne({
        where: { id_user }
    })

    if (!foundUser) {
        throw new NotFoundError('User not found!')
    }

    return await User.update({
        password: repass
    }, {
        where: { id_user }
    })

}

const getAllUser = async () => {
    return await User.findAll()
}

const searchUserByUserName = async (keySearch) => {
    try {

        const users = await User.findAll({
            where: {
                username: {
                    [Op.iLike]: `%${keySearch}%`
                }
            }
        })
        return users
    } catch (error) {
        throw new BadRequestError('Could not search user', error)
    }
}

const findProfileUser = async (id_user) => {
    return await Profile.findOne({
        where: { id_user }
    })
}

const verifyEmail = async (email) => {
    const foundUser = await User.findOne({
        where: { email }
    })

    if (!foundUser) {
        throw new NotFoundError('User does not exists!')
    }

    await foundUser.update({
        verified: true
    })

}

module.exports = {
    findUserById,
    findUserInCart,
    updateProfile,
    getUserAndProfile,
    updatePassword,
    createProfile,
    getAllUser,
    searchUserByUserName,
    findProfileUser,
    verifyEmail
}