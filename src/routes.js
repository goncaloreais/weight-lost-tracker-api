// importing router
const router = require('express').Router();

// importing controllers
const weightLogCtrl = require('./controllers/weightLog');
const usersCtrl = require('./controllers/users');

// manipulating Log model
// @TODO: change this route so it returns a user weight-logs 
router.route('/weight-log')
    .get(weightLogCtrl.get)
    .post(weightLogCtrl.post);

router.route('/users')
    .get(usersCtrl.get)
    .post(usersCtrl.post);

// exports routes
module.exports = router;