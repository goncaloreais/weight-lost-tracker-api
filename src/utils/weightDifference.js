const calculate = function(initialWeight, finalWeight) {
    let difference = (initialWeight - finalWeight) * -1;
    difference = Math.round((difference + Number.EPSILON) * 100) / 100;
    return difference;
};

// exports functions
module.exports = { calculate };