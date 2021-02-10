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
        lowercase: true,
        minlength: 6,
        trim: true,
    },
    initialWeight: Number,
    currentWeight: Number,
    weightUnit: String,
    height: Number,
    sessionToken: String,
    accessToken: String,
});

UserSchema.pre('save', async function(next) {
    const user = this;
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    
    next();
});

// creating the model
const User = mongoose.model('user', UserSchema);

// exporting
module.exports = User;