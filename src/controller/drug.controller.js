'use strict'

const { SuccessResponse } = require("../core/success.response")
const DrugService = require("../service/drug.service")

class DrugController {
    getAllDrugByUser = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all drug by user",
            metadata: await DrugService.getAllDrugApplication(req.params.id_user)
        }).send(res)
    }

    deleteDrugFromApplication = async (req, res, next) => {
        new SuccessResponse({
            message: "Delete drug from drug application successfully!",
            metadata: await DrugService.deleteDrugFromDrugApplication(req.body)
        }).send(res)
    }

    getDrugAppDetailById = async (req, res, next) => {
        new SuccessResponse({
            message: "get drug app detail successfully!",
            metadata: await DrugService.getDrugDetailByIdDetail(req.params.id_app_drug_detail)
        }).send(res)
    }

    getAllDrugApplication = async (req, res, next) => {
        new SuccessResponse({
            message: 'get all drug application successfully!',
            metadata: await DrugService.getAllApplicationOfUser(req.params.id_user)
        }).send(res)
    }

    getApplicationDetailByIdApp = async (req, res, next) => {
        new SuccessResponse({
            message: 'get application detail successfully!',
            metadata: await DrugService.getApplicationDetailByIdApp(req.params.id_app)
        }).send(res)
    }

    getAllDrugSystem = async (req, res, next) => {
        new SuccessResponse({
            message: 'get all drug !',
            metadata: await DrugService.getAllDrugSystem()
        }).send(res)
    }

    searchFunction = async (req, res, next) => {
        new SuccessResponse({
            message: 'Result search',
            metadata: await DrugService.searchDrugFunc(req.query.searchText)
        }).send(res)
    }

    getAllApplicationByIdApplication = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all application successfully!",
            metadata: await DrugService.getAllDrugApplicationByIDApplication(req.params.id_app)
        }).send(res)
    }

    scanDrugApplication = async (req, res, next) => {
        new SuccessResponse({
            message: "Scan successfully!",
            metadata: await DrugService.scanDrugApplication(req.body)
        }).send(res)
    }

    addDrugCustomNotification = async (req, res, next) => {
        new SuccessResponse({
            message: "Add drug custom notification successfully!",
            metadata: await DrugService.addDrugNotifyCustom(req.body)
        }).send(res)
    }

    getDrugFromDrugAppDetail = async (req, res, next) => {
        new SuccessResponse({
            message: "Get drug successfully!",
            metadata: await DrugService.getDrugFromDrugDetailApp(req.body)
        }).send(res)
    }
}

module.exports = new DrugController()