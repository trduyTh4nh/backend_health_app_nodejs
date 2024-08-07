'use strict'

// const { DataTypes } = require('sequelize')
// const sequelize = require('../db/init.sequelize');


// const Drug = sequelize.define('Drug', {
//     id_drug: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     name: {
//         type: DataTypes.STRING(100),
//         allowNull: false
//     },
//     ingredient: {
//         type: DataTypes.STRING(200)
//     },
//     indication: {
//         type: DataTypes.STRING(200)
//     },
//     containdication: {
//         type: DataTypes.STRING(200)
//     },
//     uses: {
//         type: DataTypes.STRING(500)
//     },
//     side_effect: {
//         type: DataTypes.STRING(500)
//     },
//     production_date: {
//         type: DataTypes.DATE
//     },
//     price: {
//         type: DataTypes.NUMERIC(10, 2),
//         allowNull: false
//     },
//     description: {
//         type: DataTypes.STRING(500)
//     },
//     code: {
//         type: DataTypes.STRING(100)
//     },
//     unit: {
//         type: DataTypes.STRING(50)
//     }
// }, {
//     tableName: 'drug',
//     timestamps: false
// });

// module.exports = Drug


module.exports = (sequelize, DataTypes) => {
    const Drug = sequelize.define('Drug', {
        id_drug: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        ingredient: {
            type: DataTypes.STRING(200)
        },
        indication: {
            type: DataTypes.STRING(200)
        },
        containdication: {
            type: DataTypes.STRING(200)
        },
        uses: {
            type: DataTypes.STRING(500)
        },
        side_effect: {
            type: DataTypes.STRING(500)
        },
        production_date: {
            type: DataTypes.DATE
        },
        price: {
            type: DataTypes.NUMERIC(10, 2),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(500)
        },
        code: {
            type: DataTypes.STRING(100)
        },
        unit: {
            type: DataTypes.STRING(50)
        },
        image: {
            type: DataTypes.STRING(500)
        }
    }, {
        tableName: 'drug',
        timestamps: false
    })

    // const Brand = require('./brand.model')(sequelize, DataTypes)

    // Drug.belongsTo(Brand, {
    //     foreignKey: 'id_brand'
    // })
    return Drug
}
