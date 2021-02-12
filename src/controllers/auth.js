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

        // compares the received password with the hashed one in the db
        if(bcrypt.compareSync(req.body.password, user.password)) {

            // generates a new token for the logged user
            user.sessionToken = tokenGenerator.token();
            
            // @TODO: handle error
            user.save((userError, newUser) => {
                // @TODO: review this

                // since a new token is generated, the session must be updated or created
                let login = new Login({
                    sessionToken: newUser.sessionToken,
                    lastAccess: Date.now(),
                    userId: newUser._id,
                });
                

                Login.findOne({ userId: newUser._id }, (sessionError, sesssion) => {
                    // removes sensible info from response
                    delete newUser.password;
                    delete newUser.__v;
                    delete newUser._id;

                    if (sessionError) {
                        // @TODO: handle error 
                        res.json(err);
                    } else {
                        // if there is no session, creates one
                        if(!sesssion) {
                            Login.create(login, (newSessionError, newSession) => {
                                res.status(200).send(
                                    httpResponse.successResponse(200, 'User authenticated!', newUser)
                                );
                            })
                        } else {
                            // if there is one, updates it
                            sesssion.sessionToken = login.sessionToken;
                            sesssion.lastAccess = login.lastAccess;

                            sesssion.save((newSessionError, newSession) => {
                                res.status(200).send(
                                    httpResponse.successResponse(200, 'User authenticated!', newUser)
                                );
                            })
                        }
                    }
                });
            });
        } else {
            // if the password is incorrect
            res.status(401).send(
                httpResponse.successResponse(401, 'User not authenticated!')
            );
        }
    });
};

module.exports = { post };