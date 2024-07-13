'use strict'

const { DataTypes } = require('sequelize')
const sequelize = require('../db/init.sequelize');
const Brand = require('./brand.model');


const Drug = sequelize.define('Drug', {
    id_drug: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ingredient: {
        type: DataTypes.STRING(200)
    },
    indication: {
        type: DataTypes.STRING(200)
    },
    containdication: {
        type: DataTypes.STRING(200)
    },
    uses: {
        type: DataTypes.STRING(500)
    },
    side_effect: {
        type: DataTypes.STRING(500)
    },
    production_date: {
        type: DataTypes.DATE
    },
    price: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(500)
    },
    code: {
        type: DataTypes.STRING(100)
    },
    unit: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'drug',
    timestamps: false
});

Drug.belongsTo(Brand, {
    foreignKey: 'id_brand'
})

module.exports = Drug;