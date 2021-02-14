// import required dependencies
const httpResponse = require('../utils/httpResponses');

// imports required models
const User = require('../models/Data/User');
const LogCollectionFactory = require('../models/Data/Log');

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

function totalDifference(req, res) {
    User.findOne({_id: req.userId }, (userError, user) => {
        if (userError) {
            // @TODO: review this
            res.json({
                status: "error",
                message: err,
            });
        }

        const initialWeight = user.initialWeight;
        const Logs = LogCollectionFactory(req.userId);

        // finds the last existing log
        Logs.findOne({}).sort({datetime: 'desc'}).exec((logError, log) => {
            // @TODO: make validation

            let currentDifference = (initialWeight - log.weight) * -1;
            currentDifference = Math.round((currentDifference + Number.EPSILON) * 100) / 100;

            const responseBody = {
                initialWeight: initialWeight,
                lastRecordedWeight: log.weight,
                lastRecordDate: log.datetime,
                difference: currentDifference,
                unit: user.weightUnit,
                parsedWeight: currentDifference + user.weightUnit,
                status: currentDifference >= 0 ? 'gaining' : 'losing',
            };

            res.status(200).send(
                httpResponse.successResponse(200, "Total weight difference sucessfully fetch", responseBody)
            );
        })
    });
};

module.exports = { 
    initialWeight,
    totalDifference
};