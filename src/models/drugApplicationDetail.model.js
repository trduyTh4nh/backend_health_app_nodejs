'use strict'

// const { DataTypes } = require('sequelize')
// const sequelize = require('../db/init.sequelize');



// const DrugApplicationDetail = sequelize.define('DrugApplicationDetail', {
//     id_app_detail: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     note: {
//         type: DataTypes.STRING(200)
//     },
//     time_to_use: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     quantity_used: {
//         type: DataTypes.INTEGER
//     }
// }, {
//     tableName: 'drug_application_detail',
//     timestamps: false
// });

// // một đơn thuốc chi tiết chỉ thuộc về một thuốc
// DrugApplicationDetail.belongsTo(Drug, {
//     foreignKey: 'id_drug',
//     onDelete: 'CASCADE'
// })



// module.exports = DrugApplicationDetail



module.exports = (sequelize, DataTypes) => {
    const DrugApplicationDetail = sequelize.define('DrugApplicationDetail', {
        id_app_detail: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        note: {
            type: DataTypes.STRING(200)
        },
        time_to_use: {
            type: DataTypes.DATE,
            allowNull: false
        },
        quantity_used: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'drug_application_detail',
        timestamps: false
    })

    // const Drug = require('./drug.model')(sequelize, DataTypes)

    // DrugApplicationDetail.belongsTo(Drug, {
    //     foreignKey: 'id_drug',
    //     onDelete: 'CASCADE'
    // })

    return DrugApplicationDetail
};