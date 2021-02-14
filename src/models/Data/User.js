// importing dependencies
const mongoose = require('mongoose');

// @TODO: more on this: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs');

// creating the schema
const UserSchema = mongoose.Schema({
    name: String,
    surname: String,
    username: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    initialWeight: Number,
    currentWeight: Number,
    weightUnit: String,
    height: Number,
    sessionToken: String,
    role: String,
});

// @TODO: transfer this function to user validators
UserSchema.pre('save', function(next) {
    const user = this;
    
    if(user.isModified("password")) {
        user.password = bcrypt.hashSync(user.password);
    }
    
    next();
});

// creating the model
const User = mongoose.model('user', UserSchema);

// exporting
module.exports = User;