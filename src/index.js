// dependencies
const express = require('express');
const mongoose = require('mongoose');

// adds reference to secrets file when running locally
let secrets = null;
if(!process.env.ON_HEROKU) {
    secrets = require('../secrets.json');
}

// app init
const app = express();
app.use(express.json());

// db connection init
mongoose.connect(
    process.env.MONGO_DB_URI || 
    secrets.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
if(!db) { 
    console.log("Error connecting to the db!"); 
}

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