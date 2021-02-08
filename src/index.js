// dependencies
const express = require('express');
const mongoose = require('mongoose');

// required imports
const utils = require('./utils/httpResponses');
const routes = require('./routes');

// adds reference to secrets file when running locally
let secrets = null;
if(!process.env.production) {
    secrets = require('../secrets.json');
}

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

// adds some security (temporary)
app.use((req, res) => {
    const header = process.env.production ? process.env.security_header : secrets.security_header;
    if(req.headers.security !== header) {
        res.status(401).send(utils.errorResponse(401, 'Unauthorized!'));
        return;
    }

    req.next();
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