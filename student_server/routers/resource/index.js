/**
 * Created by wangzhaoyi on 16/7/4.
 */
var express = require('express');
var resource_controller = require('../../controllers/index').resource;
var upload_router = require('./upload/index');


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