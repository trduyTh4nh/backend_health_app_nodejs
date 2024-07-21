
const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const { getInfoData } = require('../../utils');
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


const updateProfile = async (id_user,
    {
        height,
        weight,
        age,
        gender,
        address,
        avatar
    }
) => {

    return await Profile.update({
        height,
        weight,
        age,
        gender,
        address,
        avatar
    }, {
        where: { id_user: id_user }
    })
}


const getUserAndProfile = async (id_user) => {

    const user = await User.findOne({ where: { id_user } })

    const profile = await Profile.findOne({ where: { id_user: id_user } })
    const infodata = getInfoData({fields: [
        'id_user',
        'username',
        'email'
    ], object: user.dataValues})
    return {
        ...infodata,
        profile: profile
    }
}




module.exports = {
    findUserById,
    findUserInCart,
    updateProfile,
    getUserAndProfile
}