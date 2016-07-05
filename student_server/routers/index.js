/**
 * Created by Obscurity on 2016/4/5.
 */

var express = require('express');
var controller = require('../controllers');
var user_router = require('./users');
var group_router = require('./groups');
<<<<<<< HEAD
var resource_router = require('./resource');
=======
var submit_router = require('./submit');
>>>>>>> c1a1d8c7a41fe655e3cfc231801376a74263cce2
var request_data_logger = require('../middlewares').request_data_logger;

var router = express.Router({
    mergeParams: true
});

router.use(request_data_logger);

router.get('/', controller.index);

router.use('/users', user_router);

router.use('/groups', group_router);
router.use('/resource', resource_router);

router.use('/submit', submit_router);

module.exports = router;