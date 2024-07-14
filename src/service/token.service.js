

const { BadRequestError } = require("../core/error.response");
const { getTokenUser } = require("../models/repositories/token.repo");
const sequelize = require('../db/init.sequelize');
const DataTypes = require('sequelize').DataTypes;
const UserToken = require("../models/userToken.model")(sequelize, DataTypes);


const saveToken = async (id_user, token) => {
    try {
        const tokenFound = await getTokenUser(id_user);
        if (tokenFound) {
            return await UserToken.update(
                { token: token }, 
                { where: { user_id: id_user } }
            );
        } else {
            return await UserToken.create({
                user_id: id_user,
                token: token
            });
        }
    } catch (error) {
        throw new BadRequestError("Fail to create token!");
    }
}

module.exports = {
    saveToken
}
