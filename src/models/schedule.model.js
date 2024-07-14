'use strict'

// const { DataTypes } = require('sequelize')
// const sequelize = require('../db/init.sequelize')

// const Schedule = sequelize.define('Schedule', {
//     id_schedule: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     id_drug_application: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     id_user: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     status: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true
//     },

// }, {
//     tableName: 'schedule',
//     timestamps: true
// })

// module.exports = Schedule

module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
        id_schedule: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_drug_application: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

    }, {
        tableName: 'schedule',
        timestamps: true
    })

    
    // const User = require('./user.model')(sequelize, DataTypes)
  
    // Schedule.belongsTo(User, {
    //     foreignKey: 'id_user',
    //     onDelete: 'CASCADE'
    // })



    return Schedule
}

