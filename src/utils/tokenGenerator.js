const crypto = require('crypto');

const token = function() {
    return crypto.randomBytes(20).toString('hex');
};

// exports functions
module.exports = { 
    token
};