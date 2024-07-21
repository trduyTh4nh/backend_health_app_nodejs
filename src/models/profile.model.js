

module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        id_resume: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        height: {
            type: DataTypes.INTEGER
        },
        weight: {
            type: DataTypes.DOUBLE
        },
        age: {
            type: DataTypes.INTEGER
        },
        gender: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        id_user: {
            type: DataTypes.INTEGER
        },
        avatar: {
            type: DataTypes.STRING(500)
        }
    }, {
        tableName: 'profile',
        timestamps: false
    })

    return Profile
}