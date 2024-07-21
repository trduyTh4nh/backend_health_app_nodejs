'use strict'

const { NotFoundError } = require("../core/error.response")
const { insertLog, getAllLogs } = require("../models/repositories/log.repo")
const { findUserById } = require("../models/repositories/user.repo")

class LogService {
    static insertLog = async (payload) => {

         const { id_schedule_detail, id_user } = payload
        // console.log("id_schedule_detail: " + id_schedule_detail)
        // console.log("id_user: " + id_user)

        const date_save = new Date().toLocaleDateString()
        return await insertLog({ id_schedule_detail, date_save, id_user })
    }

    static getAllLog = async (id_user) => {
        const foundUser = await findUserById(id_user)
        if(!foundUser){
            throw new NotFoundError('User not found!')
        }
        const result = await getAllLogs(id_user)
        return result
    }
    
}

module.exports = LogService