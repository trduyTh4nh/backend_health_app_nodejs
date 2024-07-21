'use strict'
const { SuccessResponse } = require("../core/success.response")
const AddressService = require("../service/address.service")



class AddressController {

    addAddress = async (req, res, next) => {
        new SuccessResponse({
            message: "Add address successfully!",
            metadata: await AddressService.addAddressUser(req.body)
        }).send(res)
    }

    updateAddress = async (req, res, next) => {
        new SuccessResponse({
            message: "Update address successfully!",
            metadata: await AddressService.updateAddresUser(req.body)
        }).send(res)
    }

    deleteAddress = async (req, res, next) => {
        new SuccessResponse({
            message: "Remove addsuccessfully!",
            metadata: await AddressService.deleteAddressUser(req.params.id_address)
        }).send(res)
    }

    getAllAddressUser = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all address of user successfully!",
            metadata: await AddressService.getAllAddressUser(req.params.id_user)
        }).send(res)
    }
}

module.exports = new AddressController()