// imports required models
const User = require('../models/Data/User');

// gets every user
function getUsers() {
    return User.find().exec();
};

// gets every user that is an admin
function getAdmin() {
    return User.find({role: 'admin'}).exec();
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
    getAdmin,
    getUserById,
    getUserByUsername,
    createUser,
};