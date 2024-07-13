const DrugApplication = require("../drugApplication.model");
const User = require("../user.model");

DrugApplication.belongsTo(userModel, {
    foreignKey: 'id_user'
});


User.hasMany(DrugApplication, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE'
})
