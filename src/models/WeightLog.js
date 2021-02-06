// importing dependencies
const mongoose = require('mongoose');

// creating the schema
const WeightLogSchema = mongoose.Schema({
    date: Number,
    weight: Number
});

// creating the model
const WeightLog = mongoose.model('weight-log', WeightLogSchema);

// exporting
module.exports = WeightLog;