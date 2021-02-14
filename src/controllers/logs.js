// import required dependencies
const httpResponse = require('../utils/httpResponses');
const validator = require('../models/Weight/validators');

// imports required models
const LogCollectionFactory = require('../models/Weight/Log');

// gets every Log
function get(req, res) {
    const Log = LogCollectionFactory(req.userId);

    Log.find((err, messages) => {
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
            message: "Logs retrieved successfully",
            data: messages
        });
    });
};

// creates a new Log
function post(req, res) {
    
    const error = validator.postHasErrors(req.body);
    if(error) {
        res.status(error.code).send(error);

        // ends the process
        return;
    }

    const Log = LogCollectionFactory(req.userId);
    
    let log = new Log({
        weight: req.body.weight,
        datetime: 0
    });
    
    Log.create(log, (err) => {
        if (err) {
            res.json(err);
        }
        
        // @TODO: review this
        else {
            res.json({
                message: 'New Log created!',
                data: log
            });
        }  
    });
};

module.exports = { get, post };