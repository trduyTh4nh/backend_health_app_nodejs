const { BadRequestError, NotFoundError } = require('../core/error.response')
const { insertCart, findCartByIdUser, addDrugToCart, updateQuantityCart, updateQuantityCartDetail, foundCartDetail, foundCartDetailById, getAllProductInCartOfUser } = require('../models/repositories/cart.repo')
const { findUserById, findUserInCart } = require('../models/repositories/user.repo')

class CartService {


    // tạo cart cho user khi đăng kí
    static createCart = async (id_user) => {
        const foundUser = await findUserById(id_user)

        if (!foundUser) {
            throw new NotFoundError('Not found user to create cart')
        }
        const foundUserIncart = await findUserInCart(id_user)
        if (foundUserIncart) {
            throw new BadRequestError('Cart already exist!')
        }
        var current_date = new Date().toLocaleDateString()
        console.log(current_date)
        return await insertCart({ id_user, create_date: current_date })

    }

    static insertDrugIntoCart = async ({ id_drug, id_user }) => {
        try {
            console.log("DEBUG ID_USER: ", id_user);
            const foundUser = await findUserById(id_user);
            if (!foundUser) {
                throw new NotFoundError('User not found!');
            }

            const foundCartUser = await findCartByIdUser(id_user);
            if (!foundCartUser) {
                throw new NotFoundError('Cart does not exist!');
            }

            console.log("Debug id_cart: " + foundCartUser.id_cart);

            var currentDate = new Date().toLocaleDateString();
            const insertCartDetailToCart = await addDrugToCart({
                id_drug: id_drug,
                id_cart: foundCartUser.id_cart,
                add_date: currentDate,
            });

            if (!insertCartDetailToCart) {
                throw new BadRequestError('Can not add drug to cart!');
            }

            const result = await updateQuantityCart({ cart: foundCartUser, quantity: 0 });
            console.log('Update Quantity Cart Result:', result);

            return result;

        } catch (error) {
            console.error('Error in insertDrugIntoCart:', error);
            throw new BadRequestError(error.message);
        }
    };

    static updateQuantityCart = async (payload) => {
        const { id_cart_detail, quantity } = payload
        const foundCartDetail = await foundCartDetailById(id_cart_detail)
        if (!foundCartDetail) {
            throw new NotFoundError('Can not find car detail!')
        }
        return await updateQuantityCartDetail({ id_cart_detail, quantity })
    }


    static getAllDrugInCartUser = async (id_user) => {
        return await getAllProductInCartOfUser(id_user)
    }

    // cứ cho nó insert xong mỗi lần insert
    // viết 1 hàm update lại số lượng giỏ hàng
    // nếu mà id thuốc nó ví dụ thuốc trong giỏ hàng là
    // [2,3,4,5]
    // mà khi update nó vẫn là 2,3,4,5 thì sẽ tìm cách  (chỗ này dùng thuật toán lọc bửa làm bên cái cart của app thời trang)
    // cho cái số  new_quantity= - old_quantity  nếu bằng 0 thì
    // dùng hàm increment của squelize  thì update bằng += 0 vào cái quantity của cart thực tế
    // nếu new_quantity - old_quantity = -1 thì update cho thằng increment + -1 và quantity thực của cart

}


module.exports = CartService