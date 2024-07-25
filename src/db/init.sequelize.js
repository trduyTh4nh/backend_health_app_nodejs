'use strict'
require('dotenv').config()
const { Sequelize } = require('sequelize')
const defineAssociations = require('../models/defination/define')
const USER = process.env.USERNAMEP
const PASSWORD = process.env.PASSWORD
const HOST = process.env.HOST
const PORT = process.env.PORTPR
const DATABASE = process.env.DATABASE


const sequelizes = new Sequelize({
    database: DATABASE,
    username: USER,
    password: PASSWORD,
    host: HOST,
    port: PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        useUTC: false
    },
    timezone: '+07:00'
})


const DataTypes = require('sequelize').DataTypes;

const User = require('../models/user.model')(sequelizes, DataTypes);
const DrugApplication = require('../models/drugApplication.model')(sequelizes, DataTypes);
const Schedule = require('../models/schedule.model')(sequelizes, DataTypes);
const ScheduleDetail = require('../models/scheduleDetail.model')(sequelizes, DataTypes);
const Drug = require('../models/drug.model')(sequelizes, DataTypes);
const Brand = require('../models/brand.model')(sequelizes, DataTypes);
const DrugApplicationDetail = require('../models/drugApplicationDetail.model')(sequelizes, DataTypes);
const UserToken = require('../models/userToken.model')(sequelizes, DataTypes);
const Cart = require('../models/cart.model')(sequelizes, DataTypes);
const CartDetail = require('../models/cart.detail.model')(sequelizes, DataTypes);
const Address = require('../models/address.model')(sequelizes, DataTypes)
const PaymentInfo = require('../models/paymentInfo.model')(sequelizes, DataTypes)
const Log = require('../models/logs.model')(sequelizes, DataTypes)
const Hospital = require('../models/hospital.model')(sequelizes, DataTypes)
const Payment = require('../models/payment.model')(sequelizes, DataTypes)
const Invoice = require('../models/invoice.model')(sequelizes, DataTypes)
const InvoiceDetail = require('../models/invoiceDetail.model')(sequelizes, DataTypes)
const Notification = require('../models/notification.model')(sequelizes, DataTypes)
const Disease = require('../models/disease.model')(sequelizes, DataTypes)
defineAssociations(sequelizes);

sequelizes.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});


module.exports = sequelizes