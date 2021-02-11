// import required dependencies
const bcrypt = require('bcryptjs');
const tokenGenerator = require('../utils/tokenGenerator');
const httpResponse = require('../utils/httpResponses');

// imports required models
const User = require('../models/User/User');
const Login = require('../models/Login/Login');

// login request
function post(req, res) {
    User.findOne({ username: req.body.username }, (error, user) => {
        if(!user) {
            // @TODO: review this
            res.json('no_user');
            return;
        }

        console.log('ecgou aqui: ', req.body.password, user.password);
        if(bcrypt.compareSync(req.body.password, user.password)) {
            user.sessionToken = tokenGenerator.token();
            
            // @TODO: handle error
            user.save((err, newUser) => {
                // @TODO: review this

                let login = new Login({
                    sessionToken: newUser.sessionToken,
                    lastAccess: Date.now(),
                    userId: newUser._id,
                });
                    
                Login.create(login, (err) => {
                    if (err) {
                        // @TODO: handle error 
                        res.json(err);
                    } else {
                        // removes sensible info from response
                        delete newUser.password;
                        delete newUser.__v;
                        delete newUser._id;

                        res.status(200).send(
                            httpResponse.successResponse(200, 'User authenticated!', newUser)
                        );
                    }
                });
            })
        } else {
            res.status(401).send(
                httpResponse.successResponse(401, 'User not authenticated!')
            );
        }
    });
};

module.exports = { post };