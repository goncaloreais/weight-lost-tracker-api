// imports required models
const WeightLog = require('../models/WeightLog');

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
    let weightLog = new WeightLog();
    
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