'use strict'

const { ReasonPhrases } = require('../utils/httpStatusCode')
const StatusCode = require('../utils/statusCode')

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }

}

class ConflitRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}


class BadRequestError extends ErrorResponse {
    constructor(message = ReasonPhrases.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = ReasonPhrases.NOT_FOUND, statusCode = StatusCode.NOT_FOUND) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCode.UNAUTHORIZED) {
        super(message, statusCode)
    }
}


module.exports = {
    ConflitRequestError,
    BadRequestError,
    NotFoundError,
    AuthFailureError,
}
