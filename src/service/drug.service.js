'use strict'

const { forEach, forIn, get } = require("lodash")
const { BadRequestError, NotFoundError } = require("../core/error.response")
const { getDrugApplicationByUser, getDrugApplicationDetailFrom, getScheduleDetailByAppDrugDetail, getDrugFromId, getDrugAppFromId, getListApplicationDetailFrom, deleteDrugFromDrugApplucation, deleteScheduleDetail, getDrugDetailById } = require("../models/repositories/drug.repo")
const { NotBeforeError } = require("jsonwebtoken")

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
                    const drug = await getDrugFromId(drugAppDetailItem.id_drug)

                    return {
                        ...drugAppDetailItem.dataValues,
                        drug: drug,
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

    static deleteDrugFromDrugApplication = async ({ id_app_detail }) => {
        try {
            console.log("DEBUG: ", id_app_detail)
            if (!id_app_detail) {
                throw new NotFoundError('not found id_app_detail')
            }
            await deleteScheduleDetail(id_app_detail)
        } catch (error) {
            throw new BadRequestError(error)
        }
    }

    static getDrugDetailByIdDetail = async (id_drug_detail) => {
        if (!id_drug_detail) {
            throw new NotFoundError('Not found drug detail')
        }
        return await getDrugDetailById(id_drug_detail)
    }
}
module.exports = DrugService