'use strict'

const { forEach, forIn } = require("lodash")
const { BadRequestError } = require("../core/error.response")
const { getDrugApplicationByUser, getDrugApplicationDetailFrom } = require("../models/repositories/drug.repo")

class DrugService {
    static getAllDrugApplication = async (id_user) => {
        try {
            const drugApplications = await getDrugApplicationByUser(id_user)

            if (!drugApplications) {
                return []
            }

            const finalDrugApplication = []
            for (let index = 0; index < drugApplications.length; index++) {
                const drugApp = drugApplications[index];
                const drugAppId = drugApp.id

                const drugAppDetail = await getDrugApplicationDetailFrom(drugAppId)

                const updatedDrugApp = {
                    ...drugApp.dataValues,
                    drugApplicationDetail: drugAppDetail
                }

                finalDrugApplication.push(updatedDrugApp)
            }

            return finalDrugApplication
        } catch (error) {
            throw new BadRequestError(error)
        }
    }
}


module.exports = DrugService