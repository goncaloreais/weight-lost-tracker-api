// importing dependencies
const mongoose = require('mongoose');
const helpers = require('../helpers');

// creating the schema
const WeightLogSchema = mongoose.Schema({
    datetime: {
        type: Number,
        set: helpers.insertTimestamp
    },
    weight: Number
});

// creating the model
const WeightLog = mongoose.model('weight-log', WeightLogSchema);

// exporting
module.exports = WeightLog;