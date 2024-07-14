'use strict'
'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db/init.sequelize').Sequelize;




// const Brand = sequelize.define('Brand', {
//     id_brand: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: {
//         type: DataTypes.STRING(100),
//         allowNull: false
//     },
//     address: {
//         type: DataTypes.STRING(200)
//     },
//     phone: {
//         type: DataTypes.CHAR(12)
//     },
//     email: {
//         type: DataTypes.STRING(100)
//     },
//     description: {
//         type: DataTypes.STRING(500)
//     },
//     representative: {
//         type: DataTypes.STRING(50),
//         allowNull: false
//     },
//     website: {
//         type: DataTypes.STRING(200)
//     }
// }, {
//     tableName: 'brand',
//     timestamps: false
// });

// module.exports = Brand;



// const { DataTypes } = require('sequelize');
// const sequelize = require('../db/init.sequelize');

module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
        id_brand: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(200)
        },
        phone: {
            type: DataTypes.CHAR(12)
        },
        email: {
            type: DataTypes.STRING(100)
        },
        description: {
            type: DataTypes.STRING(500)
        },
        representative: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        website: {
            type: DataTypes.STRING(200)
        }
    }, {
        tableName: 'brand', 
        timestamps: false  
    });

    return Brand;
};
