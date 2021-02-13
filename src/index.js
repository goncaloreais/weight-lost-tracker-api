// dependencies
const express = require('express');
const mongoose = require('mongoose');

// required imports
const routes = require('./routes');
const authCtrl = require('./controllers/auth');

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
app.use(authCtrl.validateToken);

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