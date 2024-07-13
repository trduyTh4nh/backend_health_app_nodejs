'use strict'

const { DataTypes } = require('sequelize')
const sequelize = require('../db/init.sequelize');
const DrugApplicationDetail = require('./drugApplicationDetail.model');
const userModel = require('./user.model');


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
    }
}, {
    tableName: 'drug_application',
    timestamps: false
});


DrugApplication.hasMany(DrugApplicationDetail, {
    foreignKey: 'id_drug_application',
    onDelete: 'CASCADE'
});


module.exports = DrugApplication;
