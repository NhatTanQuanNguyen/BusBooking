class SuccessResponse{
    constructor({
        status = 'success',
        statusCode = 200,
        message = 'Success',
        data = null,
        meta = null
    }) {
        this.status = status
        this.statusCode = statusCode
        this.message = message
        this.data = data
        if (meta) this.meta = meta
    }

    send(res){
        return res.status(this.statusCode).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({
        message = 'OK',
        data = null,
        meta = null
    }){
        super({
            statusCode: 200,
            message,
            data,
            meta
        })
    }
}

class CREATED extends SuccessResponse {
    constructor({
        message = 'Created',
        data = null,
        meta = null
    }){
        super({
            statusCode: 201, 
            message,
            data,
            meta
        })
    }
}

module.exports = {
    OK,
    CREATED
}