const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const { NotFoundError } = require('../../core/error.response');
const DataTypes = require('sequelize').DataTypes;

const Cart = require('../cart.model')(sequelize, DataTypes)
const drugModel = require('../drug.model')(sequelize, DataTypes);
const CartDetail = require('../cart.detail.model')(sequelize, DataTypes)
const Drug = require('../drug.model')(sequelize, DataTypes)

// khi tạo user thì chạy api này để tạo cart cho user đó luôn, 
// mỗi user có cart riêng
const insertCart = async ({
    id_user,
    quantity = 0,
    create_date,
    total_price = 0,
}) => {
    return await Cart.create({
        id_user: id_user,
        quantity: quantity,
        create_date: create_date,
        total_price: total_price
    })
}

const addDrugToCart = async ({
    id_drug,
    id_cart,
    add_date,
    quantity = 1
}) => {

    const existingCart = await Cart.findOne({ where: { id_cart: id_cart } })
    if (!existingCart) {
        throw new Error('Cart does not exist!')
    }

    const existingDrug = await Drug.findOne({ where: { id_drug: id_drug } })

    if (!existingDrug) {
        throw new Error('Drug does not exist!')
    }



    return await CartDetail.upsert({
        id_drug,
        id_cart,
        date_add: add_date,
        quantity
    })
}

// nghiên cứu thêm
const updateQuantityCart = async ({ cart, quantity }) => {
    if (!cart || !cart.id_cart) {
        throw new Error('Invalid cart object or missing id_cart');
    }

    const listDrugCartDt = await CartDetail.findAll({ where: { id_cart: cart.id_cart } });

    if (!listDrugCartDt || listDrugCartDt.length === 0) {
        throw new Error('No drug details found for the given cart.');
    }

    listDrugCartDt.forEach((detail, index) => {
        console.log(`Drug detail ${index}:`, detail.dataValues);
    });

    const listFiltered = [];

    for (let i = 0; i < listDrugCartDt.length; i++) {
        var isDuplicate = false;
        for (let j = 0; j < listFiltered.length; j++) {
            if (listDrugCartDt[i].id_drug === listFiltered[j].id_drug) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            listFiltered.push(listDrugCartDt[i]);
        }
    }

    return {
        numberTypeOfDifferentDrugs: listFiltered.length,
        quantityTotal: listDrugCartDt.length,
        // cái list này cần loop qua cái list listDrugCartDt
        // để lấy id của các rug khác nhau sau đó dùng toán tử giải ...
        // để giải quantity vào cho từng drug
        // ex: { 
        //      id_drug: 1
        //       quantity: 3 
        //       } chứ k để list các loại như vậy FIX NÓNG 🥵
        listDrugCartDt: listFiltered,
    };
};
// tạo update quantity cart detail

const updateQuantityCartDetail = async ({ id_cart_detail, quantity }) => {
    const foundCartDetailToCount = await CartDetail.findOne({ where: { id_cart_detail: id_cart_detail } });
    return await foundCartDetailToCount.increment('quantity', { by: quantity });

}

const foundCartDetailById = async (id_cart_detail) => {
    return await CartDetail.findOne({ where: { id_cart_detail } })
}

const findCartByIdUser = async (id_user) => {
    return Cart.findOne({ where: { id_user } })
}

const getAllProductInCartOfUser = async (id_user) => {
    const findCartOfUser = await Cart.findOne({ where: { id_user: id_user } })
    if (!findCartOfUser) {
        throw new NotFoundError('Can not found cart!')
    }

    const listCartDetail = await CartDetail.findAll({ where: { id_cart: findCartOfUser.id_cart } })

    if (listCartDetail.length === 0) {
        return []
    }

    const drugIds = listCartDetail.map(detail => detail.id_drug)
    const listDrugIntoCart = await drugModel.findAll({ where: { id_drug: drugIds } })

    return listDrugIntoCart
}

module.exports = {
    insertCart,
    addDrugToCart,
    findCartByIdUser,
    updateQuantityCart,
    updateQuantityCartDetail,
    foundCartDetailById,
    getAllProductInCartOfUser
}
