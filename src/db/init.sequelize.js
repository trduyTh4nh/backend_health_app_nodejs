'use strict'
require('dotenv').config()
const { Sequelize } = require('sequelize')
const USER = process.env.USERNAMEP
const PASSWORD = process.env.PASSWORD
const HOST = process.env.HOST
const PORT = process.env.PORTPR
const DATABASE = process.env.DATABASE

const sequelizes = new Sequelize({
    database: DATABASE,
    username: USER,
    password: PASSWORD,
    host: HOST,
    port: PORT,
    dialect: 'postgres'
})

module.exports = sequelizes