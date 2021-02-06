const express = require('express');
const secrets = require('../secrets.json');

const app = express();
app.use(express.json());

app.use((req, res) => res.send('Test!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running at port ' + port + '!');
});