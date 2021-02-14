// import required dependencies
const httpResponse = require('../utils/httpResponses');

// imports required models
const User = require('../models/Data/User');

// returns the initial weight
function initialWeight(req, res) {
    User.findOne({_id: req.userId }, (err, user) => {
        if (err) {
            // @TODO: review this
            res.json({
                status: "error",
                message: err,
            });
        }
        
        const responseBody = {
            weight: user.initialWeight,
            unit: user.weightUnit,
            parsedWeight: user.initialWeight + user.weightUnit,
        };

        res.status(200).send(
            httpResponse.successResponse(200, "Initial weight sucessfully fetch", responseBody)
        );
    });
};

module.exports = { initialWeight };