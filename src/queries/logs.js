// imports required models
const LogCollectionFactory = require('../models/Data/Log');

// creates a Log
function createLog(userId, log) {
    const Log = LogCollectionFactory(userId);
    const newLog = Log(log);

    return Log.create(newLog);
}

// gets every Log for a given initial and final date
function getLogs(userId, initialDate, finalDate, sort) {
    const Log = LogCollectionFactory(userId);

    if(initialDate && finalDate) {
        return Log.find({})
            .where('datetime')
            .gte(initialDate)
            .lte(finalDate)
            .sort({datetime: sort}).exec();
    }

    if(initialDate) {
        return Log.find({})
            .where('datetime')
            .gte(initialDate)
            .sort({datetime: sort}).exec();
    }

    if(finalDate) {
        return Log.find({})
            .where('datetime')
            .lte(finalDate)
            .sort({datetime: sort}).exec();
    }

    return Log.find({}).sort({datetime: sort}).exec();
};

// gets the last log
function getLastLog(userId) {
    const Log = LogCollectionFactory(userId);
    return Log.findOne({}).sort({datetime: 'desc'});
};

module.exports = { 
    getLogs,
    getLastLog,
    createLog
};