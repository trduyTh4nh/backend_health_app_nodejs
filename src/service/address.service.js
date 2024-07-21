const { NotFoundError } = require("../core/error.response")
const { createAddress, updateAddress, findAddressById, deleteAddressById, getAllAddressForUser } = require("../models/repositories/address.repo")
const { findUserById } = require("../models/repositories/user.repo")

class AddressService {

    static addAddressUser = async (payload) => {
        const { id_user, address } = payload
        const foundUser = await findUserById(id_user)
        if (!foundUser) {
            throw new NotFoundError('User does not exist!')
        }
        const result = await createAddress(id_user, address)
        return result
    }
    static updateAddresUser = async (payload) => {
        const { id_address, address } = payload
        const foundAddress = await findAddressById(id_address)
        if (!foundAddress) {
            throw new NotFoundError('not found this address')
        }
        return await updateAddress(id_address, address)
    }

    static deleteAddressUser = async (id_address) => {
        const foundAddress = await findAddressById(id_address)
        if (!foundAddress) {
            throw new NotFoundError('not found this address')
        }
        return await deleteAddressById(id_address)
    }

    static getAllAddressUser = async (id_user) => {
        const foundUser = await findUserById(id_user)
        if (!foundUser) {
            throw new NotFoundError('User does not exist!')
        }
        return await getAllAddressForUser(id_user)
    }



}

module.exports = AddressService