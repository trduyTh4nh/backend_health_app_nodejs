'use strict'

// const { DataTypes } = require('sequelize')
// const sequelize = require('../db/init.sequelize')
// const { token } = require('morgan')

// const ScheduleDetail = sequelize.define('ScheduleDetail', {
//     id_shedule_detail: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     id_app_detail: {
//         type: DataTypes.INTEGER,
//         allowNull: false

//     },
//     id_schedule: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     status: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     quantity_used: {
//         type: DataTypes.INTEGER
//     },
//     time_use: {
//         type: DataTypes.DATE
//     }
// }, {
//     tableName: 'schedule_detail',
//     timestamps: false
// })



// module.exports = ScheduleDetail


module.exports = (sequelize, DataTypes) => {
    const ScheduleDetail = sequelize.define('ScheduleDetail', {
        id_shedule_detail: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_app_detail: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        id_schedule: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        quantity_used: {
            type: DataTypes.INTEGER
        },
        time_use: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'schedule_detail',
        timestamps: false
    })

    // const Schedule = require('./schedule.model')(sequelize, DataTypes)

    // ScheduleDetail.belongsTo(Schedule, {
    //     foreignKey: 'id_schedule',
    // })

    return ScheduleDetail
}