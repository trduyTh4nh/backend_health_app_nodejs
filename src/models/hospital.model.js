

module.exports = (sequelize, DataTypes) => {
    const Hospital = sequelize.define('Hospital', {
        id_hospital: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(200),

        },
        address: {
            type: DataTypes.STRING(200)
        },
        phone: {
            type: DataTypes.STRING(20)
        },
        create_date: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'hospital',
        timestamps: false
    })

    return Hospital
}