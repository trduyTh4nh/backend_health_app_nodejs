
module.exports = (sequelize, DataTypes) => {
    const InvoiceDetail = sequelize.define('InvoiceDetail', {
        id_invoice_detail: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_drug: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER
        },
       
        id_invoice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_app_detail: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'invoice_detail',
        timestamps: false
    })
    return InvoiceDetail
}