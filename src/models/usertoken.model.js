'use strict'

const { DataTypes } = require('sequelize')
const sequelize = require('../db/init.sequelize')
const User = require('./user.model')

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

}, {
    tableName: 'user_token',
    timestamps: false
})

UserToken.belongsTo(User, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE'
})

module.exports = UserToken