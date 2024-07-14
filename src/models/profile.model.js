const { DataTypes } = require('sequelize')
const sequelize = require('../db/init.sequelize')
const Profile = sequelize.define('Profile', {
    id_resume: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    height: {
        type: DataTypes.INTEGER
    },
    weight: {
        type: DataTypes.DOUBLE
    },
    age: {
        type: DataTypes.INTEGER
    },
    gender: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    id_user: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'profile',
    timestamps: flase
})

module.exports = Profile