// importing dependencies
const mongoose = require('mongoose');

// creating the schema
const UserSchema = mongoose.Schema({
    name: String,
    surname: String,
    initialWeight: Number,
    currentWeight: Number,
    weightUnit: String,
    height: Number,
    sessionToken: String,
    accessToken: String,
});

// creating the model
const User = mongoose.model('user', UserSchema);

// exporting
module.exports = User;