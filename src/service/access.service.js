'use strict'

const { BadRequestError, NotFoundError } = require("../core/error.response");
const User = require("../models/user.model");
const { findUserByEmail, findUserByUserName } = require("./user.service")
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const crypto = require('crypto');
const { getInfoData } = require("../utils");
require('dotenv').config()


class AccessService {
    static register = async ({ username, name, email, password, phone, role = 1 }) => {

        const foundUser = await findUserByEmail(email);
        const holder = await findUserByUserName(username);
        if (foundUser || holder) {
            throw new Error("User already exist!")
        }

        // if you want to validate with email confirmation, please code here!!

        try {
            const stalt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, stalt)

            const user = User.create({
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
                    user: {
                        username: username,
                        password: hashedPassword,
                        email: email,
                        role,
                        name,
                        phone
                    },
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
            const validate = bcrypt.compare(password, foundUser.password)
            if (!validate) {
                throw new BadRequestError('Invalid credentials')
            }

            // 
            const token = JWT.sign({ email: email }, process.env.SECRET, { expiresIn: '1h' })

            
            return {
                user: getInfoData({ fields: ['id_user', 'name', 'username', 'email'], object: foundUser }),
                token: token
            }

        } catch (error) {
            throw new BadRequestError(error)
        }

    } 

    static logout 
}

module.exports = AccessService