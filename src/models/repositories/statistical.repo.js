
const { QueryTypes, where } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const DataTypes = require('sequelize').DataTypes;

const diseaseModel = require('../disease.model')(sequelize, DataTypes)

const mostPopularDisease = async (month) => {

    const bestDisease = await sequelize.query(
        `SELECT id_disease, COUNT(*) as count
        FROM drug_application
        WHERE id_disease IS NOT NULL AND EXTRACT(MONTH FROM created_date) = ${month}
        GROUP BY id_disease
        ORDER BY count DESC, id_disease ASC
        limit 1`,
        {
            type: QueryTypes.SELECT,
        });


    console.log("BEST DISEASE: ", bestDisease)
    var result = []

    if (bestDisease.length == 0) {
        return result
    }

    const disease = await diseaseModel.findOne({
        where: { id_disease: bestDisease[0].id_disease }
    })

    result = {
        bestDisease,
        disease: disease ? disease : []

    }

    return result
}

const numberDiseaseMonthOfYear = async (id_disease, year) => {
    const query = await sequelize.query(
        `
        SELECT EXTRACT(MONTH FROM created_date) as month, count(id_disease) as count
        FROM drug_application
        WHERE id_disease = ${id_disease} and EXTRACT(YEAR FROM created_date) = ${year}
        GROUP BY EXTRACT(MONTH FROM created_date)
    `,
        {
            type: QueryTypes.SELECT,
        }
    )

    return query
}

const moneyOfMonthInYear = async (year) => {
    const query = await sequelize.query(
        `SELECT EXTRACT(MONTH FROM create_date) as month, sum(total_price) as total_money
        FROM invoice
        where EXTRACT(YEAR FROM create_date) = ${year}
        group by EXTRACT(MONTH FROM create_date)
        `,
        {
            type: QueryTypes.SELECT,
        }
    )

    return query
}

const getAllDisease = async () => {
    return await diseaseModel.findAll()
}

module.exports = {
    mostPopularDisease,
    numberDiseaseMonthOfYear,
    moneyOfMonthInYear,
    getAllDisease
}