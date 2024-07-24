
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        id_notify: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.DATE
        },
        id_user: {
            type: DataTypes.INTEGER
        },
        iscomfirmed: {
            type: DataTypes.BOOLEAN
        },
        priority: {
            type: DataTypes.INTEGER
        },
        id_schedule_detail: {
            type: DataTypes.INTEGER
        },
        id_invoice: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'notification',
        timestamps: false
    })


    return Notification
}