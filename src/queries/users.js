// imports required models
const User = require('../models/Data/User');

// gets every User
function getUserById(userId) {
    return User.findById(userId).exec();
};

function getUserByUsername(username) {
    return User.findOne({ username: username }).exec();
};

module.exports = { 
    getUserById,
    getUserByUsername
};