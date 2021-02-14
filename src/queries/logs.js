// imports required models
const LogCollectionFactory = require('../models/Data/Log');

// gets every Log for a given initial and final date
function getLogs(userId, initialDate, finalDate, sort) {
    const Log = LogCollectionFactory(userId);

    if(initialDate && finalDate) {
        return Log.find({})
            .where('datetime')
            .gte(initialDate)
            .lte(finalDate)
            .sort({datetime: sort});
    }

    if(initialDate) {
        return Log.find({})
            .where('datetime')
            .gte(initialDate)
            .sort({datetime: sort});
    }

    if(finalDate) {
        return Log.find({})
            .where('datetime')
            .lte(finalDate)
            .sort({datetime: sort});
    }

    return Log.find({}).sort({datetime: sort});
};

module.exports = { getLogs };