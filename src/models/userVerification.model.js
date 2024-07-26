
module.exports = (sequelize, DataTypes) => {
    const UserVerification = sequelize.define('UserVerification', {
        user_id: {
            type: DataTypes.INTEGER
        },
        otp: {
            type: DataTypes.STRING
        },
        createAt: {
            type: DataTypes.DATE
        },
        expiresAt: {
            type: DataTypes.DATE
        }
    }, {

        tableName: 'user_verification',
        timestamps: false
    })

    return UserVerification
}