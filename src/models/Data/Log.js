// importing dependencies
const mongoose = require('mongoose');

// creating the schema
const LogSchema = mongoose.Schema({
    datetime: Number,
    weight: Number
});

// function that receives userId to create Log collection
function LogCollectionFactory(userId) {
    // creating the model
    return mongoose.model('log-' + userId, LogSchema);
}

// exporting
module.exports = LogCollectionFactory;