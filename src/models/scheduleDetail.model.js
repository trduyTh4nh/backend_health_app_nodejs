'use strict'

module.exports = (sequelize, DataTypes) => {
    const ScheduleDetail = sequelize.define('ScheduleDetail', {
        id_schedule_detail: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false

        },
        id_app_detail: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        id_schedule: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        quantity_used: {
            type: DataTypes.INTEGER
        },
        time_use: {
            type: DataTypes.TIME
        },
        last_confirm: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'schedule_detail',
        timestamps: false
    })

    return ScheduleDetail


}