// imports required models
const Session = require('../models/Auth/Session');

// gets the session by userId
function getSessionById(userId) {
    return Session.findOne({ userId: userId }).exec();
};

// gets the session by token
function getSessionByToken(token) {
    return Session.findOne({ sessionToken: token }).exec();
};

// creates a user session
function createUserSession(session) {
    return Session.create(session);
} 

module.exports = { 
    getSessionById,
    getSessionByToken,
    createUserSession
};