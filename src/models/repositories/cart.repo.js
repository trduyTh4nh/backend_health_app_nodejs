const { where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const { NotFoundError, BadRequestError } = require('../../core/error.response');
const DataTypes = require('sequelize').DataTypes;

const Cart = require('../cart.model')(sequelize, DataTypes)
const drugModel = require('../drug.model')(sequelize, DataTypes);
const CartDetail = require('../cart.detail.model')(sequelize, DataTypes)
const Drug = require('../drug.model')(sequelize, DataTypes)
const drugApplicationDetailModel = require('../drugApplicationDetail.model')(sequelize, DataTypes);

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
    quantity = 1,
    id_app_detail
}) => {

    const existingCart = await Cart.findOne({ where: { id_cart: id_cart } })
    if (!existingCart) {
        throw new BadRequestError('Cart does not exist!')
    }

    const existingDrug = await Drug.findOne({ where: { id_drug: id_drug } })

    if (!existingDrug) {
        throw new BadRequestError('Drug does not exist!')
    }

    const checkDrugInCart = await CartDetail.findOne({
        where: { id_cart: id_cart, id_drug: id_drug }
    })

    if (checkDrugInCart) {
        throw new BadRequestError('Drug already exist in cart!')
    }

    const findFoundAppDetail = await drugApplicationDetailModel.findOne({
        where: { id_app_detail }
    })

    if(!findFoundAppDetail){
        throw new NotFoundError('Drug app detail not found!')
    }

    return await CartDetail.upsert({
        id_drug,
        id_cart,
        date_add: add_date,
        quantity,
        id_app_detail
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

    var count = 0;
    for (let k = 0; k < listFiltered.length; k++) {
        for (let i = 0; i < listDrugCartDt.length; i++) {
            if (listFiltered[k].id_drug === listDrugCartDt[i].id_drug) {
                count++
            }
        }
        listFiltered[k] = {
            ...listFiltered[k].dataValues,
            //   quantityDrugDetail: count
        }
        count = 0


    }
    var total = 0;
    for (let index = 0; index < listFiltered.length; index++) {
        total += listFiltered[index].quantity
    }

    return {
        numberTypeOfDifferentDrugs: listFiltered.length,
        quantityTotal: total,
        listDrugCartDt: listFiltered,
    };


};

// tạo update quantity cart detail
const updateQuantityCartDetail = async ({ id_cart_detail, quantity }) => {
    const foundCartDetailToCount = await CartDetail.findOne({ where: { id_cart_detail: id_cart_detail } });
    if (!foundCartDetailById) {
        throw new NotFoundError('This cart detail not found!')
    }
    // nếu thuốc bằng 1 thì không trừ nữa mà chỉ đợi để xóa
    if (foundCartDetailToCount.quantity == 1 && quantity < 0) {
        throw new BadRequestError('Quantity of drug in this cart detail minium!')
    }
    return await foundCartDetailToCount.increment('quantity', { by: quantity });
}


const foundCartDetailById = async (id_cart_detail) => {
    return await CartDetail.findOne({ where: { id_cart_detail } })
}

const findCartByIdUser = async (id_user) => {
    return Cart.findOne({ where: { id_user } })
}

const getAllProductInCartOfUser = async (id_user) => {
    const findCartOfUser = await Cart.findOne({ where: { id_user: id_user } });
    if (!findCartOfUser) {
        throw new NotFoundError('Can not found cart!');
    }

    const listCartDetail = await CartDetail.findAll({ where: { id_cart: findCartOfUser.id_cart } });

    if (listCartDetail.length === 0) {
        return [];
    }

    // Loại bỏ các mục trùng lặp dựa trên id_drug và giữ nguyên thứ tự
    const listFiltered = [];
    const seenDrugs = new Set();

    listCartDetail.forEach((item) => {
        if (!seenDrugs.has(item.id_drug)) {
            seenDrugs.add(item.id_drug);
            listFiltered.push(item);
        }
    });

    // Thêm thông tin thuốc và giữ nguyên thứ tự
    for (let k = 0; k < listFiltered.length; k++) {
        const id_drug = listFiltered[k].id_drug;
        const drug = await drugModel.findOne({ where: { id_drug } });

        listFiltered[k] = {
            ...listFiltered[k].dataValues,
            quantityDrugDetail: listCartDetail.filter((detail) => detail.id_drug === id_drug).length,
            drug: drug
        };
    }

    listFiltered.sort((a, b) => a.id_cart_detail - b.id_cart_detail);
    return {
        listFiltered
    };
};


const deleteDrugInCart = async (id_cart_detail) => {

    return await CartDetail.destroy({ where: { id_cart_detail: id_cart_detail } })
}

module.exports = {
    insertCart,
    addDrugToCart,
    findCartByIdUser,
    updateQuantityCart,
    updateQuantityCartDetail,
    foundCartDetailById,
    getAllProductInCartOfUser,
    deleteDrugInCart
}
