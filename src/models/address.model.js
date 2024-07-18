

module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        id_address: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(500),
            allowNull: false
        }

    }, {
        tableName: 'address_user',
        timestamps: false
    })


    return Address
}