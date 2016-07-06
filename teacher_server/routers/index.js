/**
 * Created by Obscurity on 2016/4/5.
 */

var express = require('express');
var controller = require('../controllers');
var download   = require('./download');
var views      = require('./views');
var test       = require('../controllers/download');
var user_router = require('./users');
var group_router = require('./groups');
var data        = require('./data');
var request_data_logger = require('../middlewares').request_data_logger;

var router = express.Router({
    mergeParams: true
});

router.use(request_data_logger);

router.get('/test',controller.test);

router.use('/',views);

router.use('/data',data);

router.use('/download',download);

router.use('/users', user_router);

router.use('/groups', group_router);

module.exports = router;