// inserts a timestamp in 'date' property of given entity
function insertTimestamp() {
    return Date.now();
}

function isNumber(value) {
    return typeof value === 'number';
}

// exports functions
module.exports = { 
    insertTimestamp,
    isNumber,
};