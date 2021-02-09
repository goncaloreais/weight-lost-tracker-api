// import required dependencies
const httpResponse = require('../utils/httpResponses');
const validator = require('../models/WeightLog/validators');

// imports required models
const WeightLog = require('../models/WeightLog/WeightLog');

// gets every WeightLog
function get(req, res) {
    WeightLog.find((err, messages) => {
        if (err) {
            // @TODO: review this
            res.json({
                status: "error",
                message: err,
            });
        }
        
        // @TODO: review this
        res.json({
            status: "success",
            message: "WeightLogs retrieved successfully",
            data: messages
        });
    });
};

// creates a new WeightLog
function post(req, res) {
    
    const error = validator.postHasErrors(req.body);
    if(error) {
        res.status(error.code).send(error);

        // ends the process
        return;
    }

    let weightLog = new WeightLog({
        weight: req.body.weight,
        datetime: 0
    });
    
    WeightLog.create(weightLog, (err) => {
        if (err) {
            res.json(err);
        }
        
        // @TODO: review this
        else {
            res.json({
                message: 'New WeightLog created!',
                data: weightLog
            });
        }  
    });
};

module.exports = { get, post };