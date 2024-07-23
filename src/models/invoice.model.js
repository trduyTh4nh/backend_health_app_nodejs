
module.exports = (sequelize, DataTypes) => {
    const Invoice = sequelize.define('Invoice', {
        id_invoice: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        create_date: {
            type: DataTypes.DATE
        },
        total_price: {
            type: DataTypes.DOUBLE
        },
        status: {
            type: DataTypes.BOOLEAN
        },
        notes: {
            type: DataTypes.STRING(500)
        },
        id_address: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_paypal: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        tableName: 'invoice',
        timestamps: false
    })

    return Invoice
}