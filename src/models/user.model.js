'use strict'

// const { DataTypes } = require('sequelize')
// const sequelize = require('../db/init.sequelize')
// const DrugApplication = require('./drugApplication.model')

// const User = sequelize.define('User', {
//     id_user: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     username: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING(50),
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     role: {
//         type: DataTypes.INTEGER
//     },
//     name: {
//         type: DataTypes.STRING(100)
//     },
//     phone: {
//         type: DataTypes.STRING(20)
//     }

// }, {
//     tableName: 'users',
//     timestamps: false
// })

// module.exports = User


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id_user: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(100)
        },
        phone: {
            type: DataTypes.STRING(20)
        }
    }, {
        tableName: 'users',
        timestamps: false
    })

    // const DrugApplication = require('./drugApplication.model')(sequelize, DataTypes)

    // // một user có nhiều đơn thuốc
    // User.hasMany(DrugApplication, {
    //     foreignKey: 'id_user',
    //     onDelete: 'CASCADE'
    // })



    return User
}