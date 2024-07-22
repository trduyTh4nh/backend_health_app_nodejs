


module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        id_payment: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date_pay: {
            type: DataTypes.DATE,
        },
        id_invoice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN
        },
        notes: {
            type: DataTypes.STRING
        },
        total_money: {
            type: DataTypes.DOUBLE
        },
    }, {
        tableName: 'payment',
        timestamps: false

    })
    return Payment
}