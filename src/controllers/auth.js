// import required dependencies
const bcrypt = require('bcryptjs');
const tokenGenerator = require('../utils/tokenGenerator');
const httpResponse = require('../utils/httpResponses');

// import required queries
const sessionQueries = require('../queries/session');
const userQueries = require('../queries/users');

// 30 min * 60 secs * 1000 ms
const tokenExpiration = 30 * 60 * 1000;

// token validation
async function validateToken(req, res, next) {
    // /auth and POST /users is the only request that do not requires a token
    if(req.path === '/auth' || (req.path === '/users' && req.method === 'POST')) {
        next();
    } else {
        // if there is no token in the request
        if(!req.query.token) {
            res.status(401).send(httpResponse.errorResponse(401, 'Unauthorized!'));
            return;
        }

        const session = await sessionQueries.getSessionByToken(req.query.token);

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
    }
}

// session request
async function post(req, res) {
    const user = await userQueries.getUserByUsername(req.body.username);

    // compares the received password with the hashed one in the db
    if(bcrypt.compareSync(req.body.password, user.password)) {

        // generates a new token for the logged user
        user.sessionToken = tokenGenerator.token();
        
        // @TODO: handle error
        user.save(async (userError, newUser) => {
            // @TODO: review this

            // since a new token is generated, the session must be updated or created
            let newSession = {
                sessionToken: newUser.sessionToken,
                lastAccess: Date.now(),
                userId: newUser._id,
            };
            
            const session = await sessionQueries.getSessionById(newUser._id);

            delete newUser.password;
            delete newUser.__v;
            delete newUser._id;

            // if there is no session, creates one
            if(!session) {
                const createdSession = await sessionQueries.createUserSession(newSession);
                res.status(200).send(
                    httpResponse.successResponse(200, 'User authenticated!', newUser)
                );
            } else {
                // if there is one, updates it
                newSession.sessionToken = session.sessionToken;
                newSession.lastAccess = session.lastAccess;

                newSession.save(() => {
                    res.status(200).send(
                        httpResponse.successResponse(200, 'User authenticated!', newUser)
                    );
                })
            }
        });
    } else {
        // if the password is incorrect
        res.status(401).send(
            httpResponse.successResponse(401, 'User not authenticated!')
        );
    }
};

module.exports = { post, validateToken };