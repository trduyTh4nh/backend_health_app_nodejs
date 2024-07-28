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
const { createProfile, verifyEmail } = require("../models/repositories/user.repo");
const nodemailer = require('nodemailer')
require('dotenv').config()

const UserVerification = require('../models/userVerification.model')(sequelize, DataTypes)


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

            await createProfile(user.id_user)

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
                user: getInfoData({ fields: ['id_user', 'name', 'username', 'email', 'role', 'verified'], object: foundUser }),
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

    static verificationEmail = async (email) => {
        return await verifyEmail(email)
    }





    static resentOpt = async ({ email }) => {
        return await sendOPTVerificationEmail({ email })
    }

    static registerV2 = async ({ username, name, email, password, phone, role = 1 }) => {
        const foundUser = await findUserByEmail(email);
        const holder = await findUserByUserName(username);
        if (foundUser || holder) {
            throw new BadRequestError("User already exists!");
        }

        // If you want to validate with email confirmation, please code here!!

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await User.create({
                username: username,
                password: hashedPassword,
                email: email,
                role,
                name,
                phone,
                verified: false
            });

            await sendOPTVerificationEmail({ _id: user.id_user, email: user.email });

            console.log("DEBUG RESULT: " + user.id_user);

            await createProfile(user.id_user);


            return {
                code: 201,
                metadata: {
                    user
                }
            };

        } catch (error) {
            throw new BadRequestError(error);
        }
    };


}



let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'Type your email here!',
        pass: 'Type your app password here!'
    },

});

const sendOPTVerificationEmail = async ({ email }) => {
    try {
        const opt = `${Math.floor(1000 + Math.random() * 9000)}`;

        // Mail options
        const mailOptions = {
            from: 'quangrain2015@gmail.com',
            to: email,
            subject: "Verify your email!",
            html: `
                <p> Nhấn vào đây để xác nhận <b> <a href='http://192.168.159.244:3107/v1/api/access/verify?email=${email}'> XÁC NHẬN EMAIL </a> </b> </p> <br>
                <p> This code <b> expires in 1 hour. </b> </p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);


    } catch (error) {
        throw new Error(`Failed to send verification email: ${error.message}`);
    }
};


module.exports = AccessService