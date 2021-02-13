// dependencies
const express = require('express');
const mongoose = require('mongoose');

// required imports
const utils = require('./utils/httpResponses');
const routes = require('./routes');
const Session = require('./models/Auth/Session');

// adds reference to secrets file when running locally
let secrets = null;
if(!process.env.production) {
    secrets = require('../secrets.json');
}

// global vars for app
// 30 min * 60 secs * 1000 ms
const tokenExpiration = 30 * 60 * 1000;

// app init
const app = express();
app.use(express.json());

// db connection init
mongoose.connect(
    process.env.mongo_uri || 
    secrets.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
if(!db) { 
    console.log("Error connecting to the db!"); 
}

// validates token
app.use((req, res) => {
    // /auth is the only request that do not requires a token
    if(req.originalUrl !== '/auth') {

        // if there is no token in the request
        if(!req.query.token) {
            res.status(401).send(utils.errorResponse(401, 'Unauthorized!'));
            return;
        }

        Session.findOne({ sessionToken: req.query.token }, (error, session) => {
            // if the request token is not found
            if(!session) {
                res.status(401).send(utils.errorResponse(401, 'Unauthorized!'));
                return;
            }

            // if the token is found but it's expired
            if(Date.now() - session.lastAccess >= tokenExpiration) {
                res.status(401).send(utils.errorResponse(401, 'Session expired!'));
                return;
            }

            // if the token is found and is not expired
            session.lastAccess = Date.now();
            session.save((error, newSession) => {
                req.next();
            });
        });
    } else {
        req.next();
    }
})

// routes usage
app.use('/', routes);

// default error
app.use((req, res) => res.status(404).send({
    code: 404,
    message: 'Not found!',
    status: 'error'
}));

// serving the app
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running at port ' + port + '!');
});