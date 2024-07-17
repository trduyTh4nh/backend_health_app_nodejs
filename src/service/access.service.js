'use strict'

const { BadRequestError, NotFoundError } = require("../core/error.response");
const sequelize = require('../db/init.sequelize');
const DataTypes = require('sequelize').DataTypes;
const User = require("../models/user.model")(sequelize, DataTypes);
const { findUserByEmail, findUserByUserName } = require("./user.service")
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const crypto = require('crypto');
const { getInfoData } = require("../utils");
const { saveToken } = require("./token.service");
const { deleteToken } = require("../models/repositories/token.repo");
require('dotenv').config()




class AccessService {
    static register = async ({ username, name, email, password, phone, role = 1 }) => {

        const foundUser = await findUserByEmail(email);
        const holder = await findUserByUserName(username);
        if (foundUser || holder) {
            throw new BadRequestError("User already exist!")
        }

        // if you want to validate with email confirmation, please code here!!

        try {
            const stalt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, stalt)

            const user = await User.create({
                username: username,
                password: hashedPassword,
                email: email,
                role,
                name,
                phone
            })

            return {
                code: 201,
                metadata: {
                    user
                }
            }

        } catch (error) {
            throw new BadRequestError(error)
        }

    }

    static login = async ({ email, password }) => {
        try {
            const foundUser = await findUserByEmail(email)
            if (!foundUser) {
                throw new NotFoundError('User not found!')
            }
            const validate = await bcrypt.compare(password, foundUser.password)
            if (!validate) {
                throw new BadRequestError('Invalid credentials')
            }
            // 
            const token = JWT.sign({ email: email }, process.env.SECRET, { expiresIn: '1h' })
            if (token) {
                await saveToken(foundUser.id_user, token)
            }
            return {
                user: getInfoData({ fields: ['id_user', 'name', 'username', 'email'], object: foundUser }),
                token: token
            }
        } catch (error) {
            throw new BadRequestError(error)
        }
    }
    static logout = async (data) => {
        try {
            const id_user = data.id_user
            await deleteToken(id_user)
        } catch (error) {
            throw new BadRequestError("Logout fail!")
        }
    }
}

module.exports = AccessService