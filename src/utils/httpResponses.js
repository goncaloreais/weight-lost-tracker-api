// base http response structure
class BaseHttpResponse {
    constructor(code, status, message, data) {
        this.code = code;
        this.status = status;
        this.message = message;

        if(data) {
            this.data = data;
        }
    }
}

function errorResponse(code, message) {
    return new BaseHttpResponse(code, 'error', message);
}

function successResponse(code, message, data) {
    return new BaseHttpResponse(code, 'success', message, data);
}

// exports functions
module.exports = { 
    errorResponse,
    successResponse
};