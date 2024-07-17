'use strict'



// const { DataTypes } = require('sequelize')
// const sequelize = require('../db/init.sequelize')

// const User = require('./user.model')
// const userModel = require('./user.model')

// const UserToken = sequelize.define('UserToken', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     token: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         unique: true
//     }

// }, {
//     tableName: 'user_token',
//     timestamps: false
// })

module.exports = (sequelize, DataTypes) => {
    const UserToken = sequelize.define('UserToken', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            unique: true
        }

    }, {
        tableName: 'user_token',
        timestamps: false
    })

 

    return UserToken
}
