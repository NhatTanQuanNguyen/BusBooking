class ErrorResponse extends Error {
    constructor({
        statusCode = 500,
        message = 'Internal Server Error',
        errors = null
    }) {
        super(message)

        this.status = 'error'
        this.statusCode = statusCode
        this.message = message
        if (errors) this.errors = errors

        Error.captureStackTrace(this, this.constructor)
    }
}

class BadRequestError extends ErrorResponse {
    constructor({ message = 'Bad Request', errors = null }) {
        super({
            statusCode: 400,
            message,
            errors
        })
    }
}


class UnauthorizedError extends ErrorResponse {
    constructor({ message = 'Unauthorized' }) {
        super({
            statusCode: 401,
            message
        })
    }
}

class ForbiddenError extends ErrorResponse {
    constructor({ message = 'Forbidden' }) {
        super({
            statusCode: 403,
            message
        })
    }
}


class NotFoundError extends ErrorResponse {
    constructor({ message = 'Not Found' }) {
        super({
            statusCode: 404,
            message
        })
    }
}

class ConflictError extends ErrorResponse {
    constructor({ message = 'Conflict' }) {
        super({
            statusCode: 409,
            message
        })
    }
}
module.exports = {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError
}
