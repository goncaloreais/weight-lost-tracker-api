// importing router
const router = require('express').Router();

// importing controllers
const weightLogCtrl = require('./controllers/weightLog');
const usersCtrl = require('./controllers/users');
const authCtrl = require('./controllers/auth');

router.route('/auth')
    .post(authCtrl.post);

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