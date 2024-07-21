

const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const { getScheduleDetailById } = require('./schedule.repo');
const { getAllDrugApplicationDetail, getDrugFromId, getApplicationDetailById } = require('./drug.repo');
const DataTypes = require('sequelize').DataTypes;
const scheduleDetailModel = require('../scheduleDetail.model')(sequelize, DataTypes);

const logs = require('../logs.model')(sequelize, DataTypes)

const insertLog = async ({
    id_schedule_detail,
    date_save,
    id_user
}) => {

    console.log("id_schedule_detail2: " + id_schedule_detail)
    console.log("id_user2: " + id_user)

    return await logs.create({
        id_schedule_detail,
        date_save,
        id_user
    })
}


// const getAllLogs = async (id_user) => {
//     const listLogs = await logs.findAll({
//         where: { id_user }
//     })
//     const result = []


//     for (let index = 0; index < listLogs.length; index++) {
//         const id_schedule_detail = listLogs[index].id_schedule_detail
//         var scheduleDetail = await getScheduleDetailById(id_schedule_detail)

//         const id_app_detail = scheduleDetail.id_app_detail
//         const listDrugAppDetail = await getAllDrugApplicationDetail(id_app_detail)

//         const drugs = []

//         for (let j = 0; j < listDrugAppDetail.length; j++) {
//             const id_drug = listDrugAppDetail[j].id_drug
//             const drug = await getDrugFromId(id_drug)
//             drugs.push(drug)
//         }

//         result.push({
//             ...scheduleDetail.dataValues,
//             drugs: drugs
//         });


//     }
//     return result

// }


// const getAllLogs = async (id_user) => {
//     const listLogs = await logs.findAll({
//         where: { id_user }
//     });

//     const result = [];

//     for (let index = 0; index < listLogs.length; index++) {
//         const id_schedule_detail = listLogs[index].id_schedule_detail;
//         const scheduleDetail = await getScheduleDetailById(id_schedule_detail);
//         if (scheduleDetail) {
//             const id_app_detail = scheduleDetail.id_app_detail;
//             const listDrugAppDetail = await getAllDrugApplicationDetail(id_app_detail);

//             const drugs = [];

//             for (let j = 0; j < listDrugAppDetail.length; j++) {
//                 const id_drug = listDrugAppDetail[j].id_drug;
//                 const drug = await getDrugFromId(id_drug);
//                 if (drug) {
//                     drugs.push(drug);
//                 }
//             }

//             result.push({
//                 ...scheduleDetail.dataValues,
//                 drugs: drugs
//             });
//         }
//     }
//     return result;
// }

const getAllLogs = async (id_user) => {
    const listLogs = await logs.findAll({
        where: { id_user }
    });

    const listLogsResult = []

    for (let i = 0; i < listLogs.length; i++) {
        const log = listLogs[i]
        const id_schedule_detail = listLogs[i].id_schedule_detail
        const scheduleDetail = await scheduleDetailModel.findOne({
            where: { id_schedule_detail }
        })
        const foundApplicationDetail = await getApplicationDetailById(scheduleDetail.id_app_detail)
        const drug = await getDrugFromId(foundApplicationDetail.id_drug)
        const objectResult = {
            ...log.dataValues,
            scheduleDetail: {
                ...scheduleDetail.dataValues,
                drugAppDetail: {
                    ...foundApplicationDetail.dataValues,
                    drug: drug
                }
            }
        }
        listLogsResult.push(objectResult)
    }
    return listLogsResult
}


module.exports = {
    insertLog,
    getAllLogs
}