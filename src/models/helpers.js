// inserts a timestamp in 'date' property of given entity
function insertTimestamp() {
    return Date.now();
}

// exports functions
module.exports = { 
    insertTimestamp
};