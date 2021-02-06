// import required dependencies
const httpResponse = require('../utils/httpResponses');

// imports required models
const WeightLog = require('../models/WeightLog/WeightLog');

// gets every WeightLog
function get(req, res) {
    WeightLog.find((err, messages) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        
        res.json({
            status: "success",
            message: "WeightLogs retrieved successfully",
            data: messages
        });
    });
};

// creates a new WeightLog
function post(req, res) {

    // no weight was provided
    if(!req.body.weight) {
        res.status(422).send(
            httpResponse.errorResponse(422, "The property 'weight' was not provided.")
        );

        res.end();
    }

    let weightLog = new WeightLog();
    weightLog.weight = req.body.weight;
    
    WeightLog.create(weightLog, (err) => {
        if (err) {
            res.json(err);
        }
            
        else {
            res.json({
                message: 'New WeightLog created!',
                data: weightLog
            });
        }  
    });
};

module.exports = { get, post };