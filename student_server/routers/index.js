/**
 * Created by Obscurity on 2016/4/5.
 */

var express = require('express');
var controller = require('../controllers');
var user_router = require('./users');
var group_router = require('./groups');
var resource_router = require('./resource');
var request_data_logger = require('../middlewares').request_data_logger;

var router = express.Router({
    mergeParams: true
});

router.use(request_data_logger);

router.get('/', controller.test);

router.use('/users', user_router);

router.use('/groups', group_router);
router.use('/resource', resource_router);

module.exports = router;