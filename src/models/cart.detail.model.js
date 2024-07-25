
module.exports = (sequelize, DataTypes) => {
    const CartDetail = sequelize.define('CartDetail', {
        id_cart_detail: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_drug: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_cart: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date_add: {
            type: DataTypes.DATE,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        id_app_detail: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'cart_detail',
        timestamps: false
    })

    return CartDetail
}