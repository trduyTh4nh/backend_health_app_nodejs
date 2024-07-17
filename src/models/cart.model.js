
module.exports = (sequelize, DataTypes) => {

    const Cart = sequelize.define('Cart', {
        id_cart: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        create_date: {
            type: DataTypes.DATE
        },
        total_price: {
            type: DataTypes.DOUBLE
        },
        id_user: {
            type: DataTypes.INTEGER
        }

    }, {
        tableName: 'drug_cart',
        timestamps: false
    })



    return Cart
}

