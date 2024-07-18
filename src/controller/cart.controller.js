'use strict'

const { CREATED, SuccessResponse } = require('../core/success.response')
const CartService = require('../service/cart.service')

class CartController {
    insertCart = async (req, res, next) => {
        new CREATED({
            message: 'Create cart successfully!',
            metadata: await CartService.createCart(req.params.id_user)
        }).send(res)
    }

    insertDrugIntoCart = async (req, res, next) => {
        new SuccessResponse({
            message: 'Insert drug into cart successfully!',
            metadata: await CartService.insertDrugIntoCart(req.body)
        }).send(res)
    }

    updateQuantityCartDetail = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update quantitiy successfully!',
            metadata: await CartService.updateQuantityCart(req.body)
        }).send(res)
    }

    getAllProductInCart = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get all product successfully!',
            metadata: await CartService.getAllDrugInCartUser(req.params.id_user)
        }).send(res)
    }

    removeDrugInCart = async (req, res, next) => {
        new SuccessResponse({
            message: 'Remove drug in cart successfully!',
            metadata: await CartService.removeDrugInCart(req.params.id_cart_detail)
        }).send(res)
    }
}

module.exports = new CartController()