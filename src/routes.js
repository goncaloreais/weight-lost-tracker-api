// importing router
const router = require('express').Router();

// importing controllers
const logsCtrl = require('./controllers/logs');
const usersCtrl = require('./controllers/users');
const authCtrl = require('./controllers/auth');
const meCtrl = require('./controllers/me');

router.route('/auth')
    .post(authCtrl.post);

// manipulating Log model
router.route('/logs')
    .get(logsCtrl.get)
    .post(logsCtrl.post);

// getting info (/me routes)
router.route('/me/initialWeight').get(meCtrl.initialWeight);
router.route('/me/actualDifference').get(meCtrl.totalDifference);


router.route('/users')
    .get(usersCtrl.get)
    .post(usersCtrl.post);

// exports routes
module.exports = router;