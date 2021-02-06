// importing router
const router = require('express').Router();

// importing controllers
const weightLogCtrl = require('./controllers/weightLog');

// manipulating Log model
router.route('/weight-log')
    .get(weightLogCtrl.get)
    .post(weightLogCtrl.post);