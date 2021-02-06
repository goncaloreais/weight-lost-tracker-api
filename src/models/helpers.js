// inserts a timestamp in 'date' property of given entity
function insertTimestamp(entity) {
    const datetime = Date.new();
    entity.date = datetime;
}

// exports functions
module.exports = { 
    insertTimestamp
};