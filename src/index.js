const express = require('express');
const mongoose = require('mongoose');

if(!process.env.ON_HEROKU) {
    const secrets = require('../secrets.json');
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

app.use((req, res) => res.send('Test!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running at port ' + port + '!');
});