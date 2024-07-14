const { Client } = require("pg")

require('dotenv').config();
// const username = process.env.USERNAME

// const USER = process.env.USERNAMEP
// const PASSWORD = process.env.PASSWORD
// const HOST = process.env.HOST
// const PORT = process.env.PORTPR
// const DATABASE = process.env.DATABASE

const sequelize = require('./init.sequelize')




class Database {
    constructor() {
        this.connect()
    }
    connect(type = "postgres") {

        // client.connect()
        //     .then(() => {
        //         console.log("Connected to PostgresSQL database")
        //     })
        //     .catch(() => {

        //         console.error('Error connecting to PostgreSQL database', err);
        //     })

        sequelize.authenticate()
            .then(() => {
                console.log('Connection to PostgreSQL has been established successfully.');
            })
            .catch((err) => {
                console.error('Unable to connect to the database:', err);
            });
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instancePostgresSQL = Database.getInstance()
module.exports = instancePostgresSQL