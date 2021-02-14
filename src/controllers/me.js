// import required dependencies

// imports required models
const User = require('../models/User/');

// gets every Log
function get(req, res) {
    const Log = LogCollectionFactory(req.userId);

    Log.find((err, messages) => {
        if (err) {
            // @TODO: review this
            res.json({
                status: "error",
                message: err,
            });
        }
        
        // @TODO: review this
        res.json({
            status: "success",
            message: "Logs retrieved successfully",
            data: messages
        });
    });
};

module.exports = { get, post };