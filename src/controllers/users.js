// import required dependencies

// imports required models
const User = require('../models/Data/User');

// gets every User
function get(req, res) {
    User.find((err, messages) => {
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
            message: "Users retrieved successfully",
            data: messages
        });
    });
};

// creates a new User
function post(req, res) {

    let user = new User({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
        initialWeight: req.body.initialWeight,
        weightUnit: req.body.weightUnit,
        height: req.body.height,
    });
    
    User.create(user, (err) => {
        if (err) {
            res.json(err);
        }
        
        // @TODO: review this
        else {
            res.json({
                message: 'New User created!',
                data: user
            });
        }  
    });
};

module.exports = { get, post };