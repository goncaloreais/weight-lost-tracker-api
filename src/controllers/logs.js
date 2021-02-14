// import required dependencies
const httpResponse = require('../utils/httpResponses');
const validator = require('../models/Data/validators');

// imports required queries
const logsQueries = require('../queries/logs');
const usersQueries = require('../queries/users');

// gets every Log
async function get(req, res) {
    const logs = await logsQueries.getLogs(req.userId, null, null, 'desc');

    // @TODO: review this
    res.json({
        status: "success",
        message: "Logs retrieved successfully",
        data: logs
    });
};

// creates a new Log
async function post(req, res) {
    const error = validator.postHasErrors(req.body);
    if(error) {
        res.status(error.code).send(error);

        // ends the process
        return;
    }
    
    let log = {
        weight: req.body.weight,
        datetime: req.body.datetime || Date.now(),
    };
    
    const newLog = await logsQueries.createLog(req.userId, log);

    const user = await usersQueries.getUserById(req.userId);
    user.currentWeight = req.body.weight;
    user.save((error, newUser) => {
        res.json({
            message: 'New Log created!',
            data: newLog
        });
    });
};

module.exports = { get, post };