// base http response structure
class BaseHttpResponse {
    constructor(code, status, message) {
        this.code = code;
        this.status = status;
        this.message = message;
    }
}

function errorResponse(code, message) {
    return new BaseHttpResponse(code, 'error', message);
}

// exports functions
module.exports = { 
    errorResponse
};