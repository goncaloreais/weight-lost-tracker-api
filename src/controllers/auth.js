// import required dependencies
const bcrypt = require('bcryptjs');

// imports required models
const User = require('../models/User/User');

// login request
function post(req, res) {
    User.findOne({ username: req.body.username }, (error, user) => {
        console.log(user);
        if(!user) {
            // @TODO: review this
            res.json('no_user');
            return;
        }
        console.log(req.body.password);
        console.log(user.password);
        console.log(bcrypt.compareSync(req.body.password, user.password));
    })
    .catch(error => {
        console.log('entrou')
        res.json(error);
    });
};

module.exports = { post };