

module.exports = (sequelize, DataTypes) => {
    const Disease = sequelize.define('Disease', {
        id_disease: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        disease_name: {
            type: DataTypes.STRING(500)
        }
    }, {
        tableName: 'disease',
        timestamps: false
    })

    return Disease
}