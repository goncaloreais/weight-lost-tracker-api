const express = require('express');
const mongoose = require('mongoose');
let secrets = null;

if(!process.env.ON_HEROKU) {
    secrets = require('../secrets.json');
}

const app = express();
app.use(express.json());

mongoose.connect(
    process.env.MONGO_DB_URI || 
    secrets.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

if(!db) {
    console.log("Error connecting db");
}
else {
    console.log("Db connected successfully");
}

// default error
app.use((req, res) => res.status(404).send({
    code: 404,
    message: 'Not found!',
    status: 'error'
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running at port ' + port + '!');
});