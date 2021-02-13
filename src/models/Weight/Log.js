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

// creating the model
const Log = mongoose.model('weight-log', LogSchema);

// @TODO: check this: https://stackoverflow.com/questions/17808739/nodejs-mongo-mongoose-dynamic-collection-name

// exporting
module.exports = Log;