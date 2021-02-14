// imports required models
const User = require('../models/Data/User');

// gets every User
function getUser(userId) {
    return User.findById(userId);
};

module.exports = { getUser };