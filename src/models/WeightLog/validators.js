const helpers = require('../helpers');
const httpResponse = require('../../utils/httpResponses');

// validates payload of WeightLog post, returning errors
function postHasErrors(body) {
    // no weight was provided
    if(!body.weight) {
        return httpResponse.errorResponse(422, "The property 'weight' was not provided.");
    }

    if(!helpers.isNumber(body.weight)) {
        return httpResponse.errorResponse(422, "The property 'weight' was not a Number.");
    }

    return false;
}

// exports functions
module.exports = { 
    postHasErrors
};