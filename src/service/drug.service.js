'use strict'

const { forEach, forIn } = require("lodash")
const { BadRequestError } = require("../core/error.response")
const { getDrugApplicationByUser, getDrugApplicationDetailFrom, getScheduleDetailByAppDrugDetail } = require("../models/repositories/drug.repo")

class DrugService {
    static getAllDrugApplication = async (id_user) => {
        try {
            const drugApplications = await getDrugApplicationByUser(id_user)

            if (!drugApplications) {
                return []
            }
            const finalDrugApplicationPromises = drugApplications.map(async (drugApp) => {
                const drugAppId = drugApp.id
                const drugAppDetail = await getDrugApplicationDetailFrom(drugAppId)

                const drugAppDetailPromises = drugAppDetail.map(async (drugAppDetailItem) => {
                    const scheduleDetailsOf = await getScheduleDetailByAppDrugDetail(drugAppDetailItem.id_app_detail)
                    return {
                        ...drugAppDetailItem.dataValues,
                        scheduleDetail: scheduleDetailsOf
                    }
                })
                const resolvedDrugAppDetails = await Promise.all(drugAppDetailPromises);
                return {
                    ...drugApp.dataValues,
                    drugAppDetailPromises: resolvedDrugAppDetails
                }
            })
            const finalDrugApplications = await Promise.all(finalDrugApplicationPromises);
            return finalDrugApplications
        } catch (error) {
            throw new BadRequestError(error)
        }
    }
}
module.exports = DrugService