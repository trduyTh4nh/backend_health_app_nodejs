'use strict'

const _ = require('lodash')

const { BadRequestError } = require('../core/error.response')

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields)
}

module.exports = {
    getInfoData,

}