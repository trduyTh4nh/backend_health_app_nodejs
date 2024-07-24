'use strict'

// const { DataTypes } = require('sequelize')
// const sequelize = require('../db/init.sequelize');
// const DrugApplicationDetail = require('./drugApplicationDetail.model');
// const User = require('./user.model');


// const DrugApplication = sequelize.define('DrugApplication', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     created_date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     doctor_name: {
//         type: DataTypes.STRING(50)
//     },
//     status: {
//         type: DataTypes.STRING(20)
//     }
// }, {
//     tableName: 'drug_application',
//     timestamps: false
// });

// // một đơn thuốc có nhiều thuốc chi tiết
// DrugApplication.hasMany(DrugApplicationDetail, {
//     foreignKey: 'id_drug_application',
//     onDelete: 'CASCADE'
// });





// module.exports = DrugApplication

module.exports = (sequelize, DataTypes) => {
    const DrugApplication = sequelize.define('DrugApplication', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        doctor_name: {
            type: DataTypes.STRING(50)
        },
        status: {
            type: DataTypes.STRING(20)
        },
        id_user: {
            type: DataTypes.INTEGER,
        },
        id_hospital: {
            type: DataTypes.INTEGER
        },
        id_disease: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'drug_application',
        timestamps: false
    })

    // const Schedule = require("./schedule.model")(sequelize, DataTypes);

    // // một đơn thuốc chỉ thuốc 1 user
    // DrugApplication.belongsTo(userModel, {
    //     foreignKey: 'id_user'
    // });

    // DrugApplication.hasOne(Schedule, {
    //     foreignKey: 'id_drug_application',
    //     onDelete: 'CASCADE'
    // })


    return DrugApplication
};
