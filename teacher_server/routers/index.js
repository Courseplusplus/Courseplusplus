/**
 * Created by Obscurity on 2016/4/5.
 */

var express = require('express');
var controller = require('../controllers');
var download   = require('./download');
var test       = require('../controllers/download');
var user_router = require('./users');
var group_router = require('./groups');
var request_data_logger = require('../middlewares').request_data_logger;

var router = express.Router({
    mergeParams: true
});

router.use(request_data_logger);

router.get('/test/test', controller.test);

//router.get('/assignment','../views/test.html');

router.use('/download',download);

router.use('/users', user_router);

router.use('/groups', group_router);

module.exports = router;