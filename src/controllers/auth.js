// import required dependencies
const bcrypt = require('bcryptjs');
const tokenGenerator = require('../utils/tokenGenerator');
const httpResponse = require('../utils/httpResponses');

// imports required models
const User = require('../models/Data/User');
const Session = require('../models/Auth/Session');

// 30 min * 60 secs * 1000 ms
const tokenExpiration = 30 * 60 * 1000;

// token validation
function validateToken(req, res, next) {
    // /auth is the only request that do not requires a token
    if(req.originalUrl !== '/auth') {

        // if there is no token in the request
        if(!req.query.token) {
            res.status(401).send(httpResponse.errorResponse(401, 'Unauthorized!'));
            return;
        }

        Session.findOne({ sessionToken: req.query.token }, (error, session) => {
            // if the request token is not found
            if(!session) {
                res.status(401).send(httpResponse.errorResponse(401, 'Unauthorized!'));
                return;
            }

            // if the token is found but it's expired
            if(Date.now() - session.lastAccess >= tokenExpiration) {
                res.status(401).send(httpResponse.errorResponse(401, 'Session expired!'));
                return;
            }

            // if the token is found and is not expired
            session.lastAccess = Date.now();
            session.save((error, newSession) => {
                req.userId = newSession.userId;
                next();
            });
        });
    } else {
        next();
    }
}

// session request
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
                let session = new Session({
                    sessionToken: newUser.sessionToken,
                    lastAccess: Date.now(),
                    userId: newUser._id,
                });
                

                Session.findOne({ userId: newUser._id }, (sessionError, sesssion) => {
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
                            Session.create(session, (newSessionError, newSession) => {
                                res.status(200).send(
                                    httpResponse.successResponse(200, 'User authenticated!', newUser)
                                );
                            })
                        } else {
                            // if there is one, updates it
                            sesssion.sessionToken = session.sessionToken;
                            sesssion.lastAccess = session.lastAccess;

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

module.exports = { post, validateToken };