// import required dependencies
const httpResponse = require('../utils/httpResponses');
const weightDifference = require('../utils/weightDifference');

// import required queries
const userQueries = require('../queries/users');
const logsQueries = require('../queries/logs');

// returns the initial weight
async function initialWeight(req, res) {
    const user = await userQueries.getUserById(req.userId);
    
    // @TODO: add validation

    const responseBody = {
        weight: user.initialWeight,
        unit: user.weightUnit,
        parsedWeight: user.initialWeight + user.weightUnit,
    };

    res.status(200).send(
        httpResponse.successResponse(200, "Initial weight sucessfully fetch", responseBody)
    );
};

// returns the total difference
async function totalDifference(req, res) {
    const user = await userQueries.getUserById(req.userId);

    const initialWeight = user.initialWeight;

    // @TODO: make validation
    const log = logsQueries.getLastLog(req.userId);
    
    let currentDifference = weightDifference.calculate(initialWeight - log.weight);

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
};

// returns if the daily log has been made, returning the last one of the day
async function dailyLog(req, res) {
    const initialDate = new Date().setHours(0, 0, 0, 0);
    const logs = await logsQueries.getLogs(req.userId, initialDate, null, 'desc');

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
};

async function dailyDifference(req, res) {
    const todayInitialDate = new Date().setHours(0, 0, 0, 0);
    const yesterdayInitialDate = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0);
    const yesterdayFinallDate = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 59, 999);
    
    const user = await userQueries.getUserById(req.userId);
    const todayLogs = await logsQueries.getLogs(req.userId, todayInitialDate, null, 'desc');
    const yesterdayLogs = await logsQueries.getLogs(req.userId, yesterdayInitialDate, yesterdayFinallDate, 'desc');

    if(yesterdayLogs.length === 0) {
        const responseBody = {
            yesterdayLog: false,
            todayLog: false,
            difference: null,
            unit: user.weightUnit
        };

        res.status(200).send(
            httpResponse.successResponse(404, "There were no logs made yesterday!", responseBody)
        );

        return;
    }

    if(todayLogs.length === 0) {
        const responseBody = {
            yesterdayLog: true,
            todayLog: false,
            difference: null,
            unit: user.weightUnit
        };

        res.status(200).send(
            httpResponse.successResponse(404, "There are no logs made today!", responseBody)
        );

        return;
    }

    const difference = weightDifference.calculate(yesterdayLogs[0].weight, todayLogs[0].weight);
    const responseBody = {
        yesterdayLog: true,
        todayLog: true,
        difference: difference,
        unit: user.weightUnit,
        parsedWeight: difference + user.weightUnit,
        status: difference >= 0 ? 'gaining' : 'losing',
    };

    res.status(200).send(
        httpResponse.successResponse(200, "The daily difference was calculated!", responseBody)
    );

};

module.exports = { 
    initialWeight,
    totalDifference,
    dailyLog,
    dailyDifference,
};