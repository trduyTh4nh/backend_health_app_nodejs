
const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const DataTypes = require('sequelize').DataTypes;

const User = require('../user.model')(sequelize, DataTypes)
const Cart = require('../cart.model')(sequelize, DataTypes)

const findUserById = async(id_user) => {
    return await User.findOne({where : { id_user: id_user }})
}


const findUserInCart = async(id_user) => {
    return await Cart.findOne({ where : { id_user } })
}



module.exports = { 
    findUserById,
    findUserInCart
}