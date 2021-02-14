// importing dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating the schema
const SessionSchema = mongoose.Schema({
    sessionToken: String,
    lastAccess: Number,
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

// creating the model
const Session = mongoose.model('session', SessionSchema);

// exporting
module.exports = Session;