/**
 * Created by Obscurity on 2016/5/12.
 */

var express = require('express');
var users_controller = require('../../controllers/index').user;
var session_router = require('./sessions/index');
var password_router = require('./password/index');
var authenticator = require('../../middlewares/authentication');

var router = express.Router({
    mergeParams: true
});

router.get('/', authenticator, users_controller.index);

router.post('/', users_controller.create);

router.put('/', authenticator, users_controller.update);

router.use('/sessions', session_router);

router.use('/password', password_router);

router.get('/:user_id', authenticator, users_controller.show);

module.exports = router;