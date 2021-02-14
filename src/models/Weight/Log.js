// importing dependencies
const mongoose = require('mongoose');
const helpers = require('../helpers');

// creating the schema
const LogSchema = mongoose.Schema({
    datetime: {
        type: Number,
        set: helpers.insertTimestamp
    },
    weight: Number
});

// function that receives userId to create Log collection
function LogCollectionFactory(userId) {
    // creating the model
    return mongoose.model('log-' + userId, LogSchema);
}

// exporting
module.exports = LogCollectionFactory;