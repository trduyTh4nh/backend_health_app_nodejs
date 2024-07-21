


module.exports = (sequelize, DataTypes) => {
    const PaymentInfo = sequelize.define('PaymentInfo', {
        id_re: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name_pay: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        num_pay: {
            type: DataTypes.STRING(80)
        },
        image: {
            type: DataTypes.STRING(500),
            allowNull: false
        }
        
    }, {
        tableName: 'payment_info',
        timestamps: false
    })

    return PaymentInfo
}