
const { BadRequestError } = require('../core/error.response')
const { mostPopularDisease, numberDiseaseMonthOfYear, moneyOfMonthInYear, getAllDisease } = require('../models/repositories/statistical.repo')

class StatisticalService {
    static statisticalMostDisease = async ({ month }) => {
        if (month <= 0 || month > 12) {
            throw new BadRequestError('Invalid month')
        }
        return await mostPopularDisease(month)
    }

    static statisticalNumberDiseaseMonthOfYear = async ({ id_disease, year }) => {
        return await numberDiseaseMonthOfYear(id_disease, year)
    }

    static statisticalMoneyInMonthOfYear = async ({ year }) => {
        return await moneyOfMonthInYear(year)
    }


    static getAllDisease = async () => {
        return await getAllDisease()
    }
}

module.exports = StatisticalService