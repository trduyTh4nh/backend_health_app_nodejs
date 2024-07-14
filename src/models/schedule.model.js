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

    // NẾU MÀY VÔ CHẠY MÀ LỖI LÀ DO CÓ QUÁ NHIỀU PHỤ THUỘC VÒNG, NGHĨA LÀ NHỮNG PHỤ THUỘC 
    // DƯ THỪA CẦN GIẢM BỚT ĐI CÁC PHỤ THUỘC đang bị lang mang

    
    
    const User = require('./user.model')(sequelize, DataTypes)
    const ScheduleDetail = require('./scheduleDetail.model')(sequelize, DataTypes)
    // một lịch chỉ thuộc về một User
    Schedule.belongsTo(User, {
        foreignKey: 'id_user',
        onDelete: 'CASCADE'
    })



    // một lịch có nhiều lịch chi tiết
    // Schedule.hasMany(ScheduleDetail, {
    //     foreignKey: 'id_schedule',
    //     onDelete: 'CASCADE'
    // })

    return Schedule
}

