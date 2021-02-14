// importing router
const router = require('express').Router();

// importing controllers
const logsCtrl = require('./controllers/logs');
const usersCtrl = require('./controllers/users');
const authCtrl = require('./controllers/auth');

router.route('/auth')
    .post(authCtrl.post);

// manipulating Log model
router.route('/logs')
    .get(logsCtrl.get)
    .post(logsCtrl.post);

// getting info
router.route('/me/initialWeight')
    .get(logsCtrl.get);


router.route('/users')
    .get(usersCtrl.get)
    .post(usersCtrl.post);

// exports routes
module.exports = router;