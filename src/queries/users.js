// imports required models
const User = require('../models/Data/User');

// gets every user
function getUsers() {
    return User.find().exec();
}

// gets user by id
function getUserById(userId) {
    return User.findById(userId).exec();
};

// gets user by username
function getUserByUsername(username) {
    return User.findOne({ username: username }).exec();
};

// creates a user
function createUser(user) {
    return User.create(user);
};

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    createUser
};