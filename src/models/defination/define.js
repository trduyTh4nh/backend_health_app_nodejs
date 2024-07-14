const defineAssociations = (sequelize) => {
    const { User, DrugApplication, Schedule, ScheduleDetail, Drug, Brand, DrugApplicationDetail, UserToken } = sequelize.models;

    // một user có nhiều đơn thuốc
    User.hasMany(DrugApplication, {
        foreignKey: 'id_user',
        onDelete: 'CASCADE'
    });

    // một user có nhiều lịch
    User.hasMany(Schedule, {
        foreignKey: 'id_user',
        onDelete: 'CASCADE'
    });

    // một lịch chỉ thuộc về một User
    Schedule.belongsTo(User, {
        foreignKey: 'id_user',
        onDelete: 'CASCADE'
    });

    // một lịch thuộc về 1 đơn thuốc
    Schedule.belongsTo(DrugApplication, {
        foreignKey: 'id_drug_application',
        onDelete: 'CASCADE'
    });

    // một lịch có nhiều lịch chi tiết
    Schedule.hasMany(ScheduleDetail, {
        foreignKey: 'id_schedule',
        onDelete: 'CASCADE'
    });

    DrugApplicationDetail.belongsTo(Drug, {
        foreignKey: 'id_drug',
        onDelete: 'CASCADE'
    });

    Drug.belongsTo(Brand, {
        foreignKey: 'id_brand'
    });

    UserToken.belongsTo(User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    });
};

module.exports = defineAssociations;
