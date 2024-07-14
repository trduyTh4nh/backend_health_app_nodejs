'use strict'

const _ = require('lodash')

const { BadRequestError } = require('../core/error.response')

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields)
}


function isValidTimeFormat(time) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return regex.test(time);
}

module.exports = {
    getInfoData,
    isValidTimeFormat
}