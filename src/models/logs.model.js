

module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('Log', {
        id_log: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_schedule_detail: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date_save: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "logs",
        timestamps: false
    })
    return Log
}

