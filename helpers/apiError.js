class APIError extends Error {
    constructor(message, code){
        super(message);
        this.code = code;
    }

    static sendBadRequestResponse(message){
        return new APIError(message, 400);
    }

    static sendUnauthorizedAccessResponse(message){
        return new APIError(message, 401);
    }

    static sendNotFoundResponse(message){
        return new APIError(message, 404);
    }
}

module.exports = APIError;