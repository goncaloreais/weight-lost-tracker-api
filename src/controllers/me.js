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

// returns the total difference
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

// returns if the daily log has been made, returning the last one of the day
function dailyLog(req, res) {
    const Logs = LogCollectionFactory(req.userId);
    const initialDate = new Date().setHours(0,0,0,0);
    const finalDate = new Date().setHours(23,59,59,999);

    Logs.find({})
        .where('datetime')
        .gte(initialDate)
        .lte(finalDate)
        .sort({datetime: 'desc'})
        .exec((logError, logs) => {
            
            if(logs.length === 0) {
                const responseBody = {
                    lastLog: false,
                    total: 0,
                    dailyLog: false,
                };

                res.status(200).send(
                    httpResponse.successResponse(404, "No logs were added today!", responseBody)
                );

                return;
            }
            
            const responseBody = {
                lastLog: logs[0],
                total: logs.length,
                dailyLog: true,
            };
            
            res.status(200).send(
                httpResponse.successResponse(200, "There are logs for toady!", responseBody)
            );
        }
    );
};

module.exports = { 
    initialWeight,
    totalDifference,
    dailyLog
};