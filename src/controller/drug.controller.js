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
}

module.exports = new DrugController()