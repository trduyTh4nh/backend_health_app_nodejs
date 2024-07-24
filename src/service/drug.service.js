'use strict'

const { forEach, forIn, get } = require("lodash")
const { BadRequestError, NotFoundError } = require("../core/error.response")
const { getDrugApplicationByUser,
    getDrugApplicationDetailFrom,
    getScheduleDetailByAppDrugDetail,
    getDrugFromId,
    getDrugAppFromId,
    getListApplicationDetailFrom,
    deleteDrugFromDrugApplucation,
    deleteScheduleDetail,
    getDrugDetailById,
    getAllApplication,
    getAllDrugApplicationDetail,
    getAllDrug,
    searchDrug,
    getDrugApplicationByIdApplication,
    scanDrugApplicationUpdate,
    createApplicationDetail,
    getDrugFromDrugApplicationDetail,
    getAllHostpital,
    searchHospital
} = require("../models/repositories/drug.repo")
const { NotBeforeError } = require("jsonwebtoken")
const { findUserById } = require("../models/repositories/user.repo")
const { findScheduleByDrugApplication, createSchedule, createScheduleDetail } = require("../models/repositories/schedule.repo")

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

    static getApplicationDetailByIdApp = async (id_app) => {
        return await getAllDrugApplicationDetail(id_app)
    }

    static getAllApplicationOfUser = async (id_user) => {
        return await getAllApplication(id_user)
    }

    static getAllDrugSystem = async () => {
        return await getAllDrug()
    }

    static searchDrugFunc = async (data) => {
        return await searchDrug(data)
    }

    static getDrugFromDrugDetailApp = async ({ id_app_detail }) => {
        const result = await getDrugFromDrugApplicationDetail(id_app_detail)
        return result
    }





    static getAllDrugApplicationByIDApplication = async (id_application) => {
        try {
            const drugApplications = await getDrugApplicationByIdApplication(id_application)

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


    static scanDrugApplication = async (payload) => {
        const { id_user, id_application } = payload

        const foundUser = await findUserById(id_user)

        if (!foundUser) {
            throw new NotFoundError('User not found!')
        }
        return await scanDrugApplicationUpdate(id_user, id_application)
    }


    // thêm thuốc custom
    // static addDrugNotifyCustom = async (payload) => {
    //     const { id_drug,
    //         id_application,
    //         quantity,
    //         list_schedule_detail,
    //         amount_per_consumption,
    //         id_user
    //     } = payload

    //     // kiểm tra đơn thuốc có appication chưa nếu chưa thì tạo 
    //     // nếu có rồi thì update
    //     const foundScheduleByDrugApplication = await findScheduleByDrugApplication(id_application)
    //     var newSchedule
    //     if (!foundScheduleByDrugApplication) {
    //         newSchedule = await createSchedule(id_user, id_application)
    //     }

    //     // tạo đơn thuốc chi tiết
    //     const drugAppDetail = await createApplicationDetail({
    //         id_drug,
    //         id_drug_application,
    //         amount_per_consumption,
    //         quantity
    //     })


    //     // kiểm tra nếu lịch được tạo mới thì lấy id lịch mới và ngược lại
    //     if(newSchedule){
    //         var id_schedule = newSchedule.id_schedule

    //         await createScheduleDetail({
    //             id_app_detail: drugAppDetail.id_app_detail,
    //             id_schedule,
    //             list_schedule_detail
    //         })
    //     }
    //     else{
    //         var id_schedule = foundScheduleByDrugApplication.id_schedule
    //         await createScheduleDetail({
    //             id_app_detail: drugAppDetail.id_app_detail,
    //             id_schedule,
    //             list_schedule_detail
    //         })
    //     }
    // }

    // thêm thuốc custom
    static addDrugNotifyCustom = async (payload) => {
        const { id_drug, id_application, quantity, list_schedule_detail, amount_per_consumption, id_user } = payload;

        try {
            // Kiểm tra đơn thuốc có appication chưa nếu chưa thì tạo, nếu có rồi thì update
            const foundScheduleByDrugApplication = await findScheduleByDrugApplication(id_application);
            let newSchedule;
            if (!foundScheduleByDrugApplication) {
                newSchedule = await createSchedule(id_user, id_application);
            }

            // Tạo đơn thuốc chi tiết
            const drugAppDetail = await createApplicationDetail({
                id_drug,
                id_drug_application: id_application,
                amount_per_consumption,
                quantity
            });

            if (!drugAppDetail) {
                throw new BadRequestError('Failed to create drug application detail');
            }

            const id_app_detail = drugAppDetail.id_app_detail;

            console.log("id_app_detail: ", id_app_detail)

            // Kiểm tra nếu lịch được tạo mới thì lấy id lịch mới và ngược lại
            const id_schedule = newSchedule ? newSchedule.id_schedule : foundScheduleByDrugApplication.id_schedule;

            const scheduleDetailResult = await createScheduleDetail({
                id_app_detail,
                id_schedule,
                listScheduleDetail: list_schedule_detail
            });

            if (!scheduleDetailResult) {
                throw new BadRequestError('Failed to create schedule detail');
            }

            return {
                drugAppDetail,
                scheduleDetailResult
            };
        } catch (error) {
            console.error('Error in addDrugNotifyCustom:', error);
            throw error;
        }
    }


    static getAllHospitalFunc = async () => {
        return await getAllHostpital()
    }
    
    static searchHospitalWithName = async (keySearch) => {
        const resultSearch = await searchHospital(keySearch)
        return resultSearch
    }
    

}
module.exports = DrugService