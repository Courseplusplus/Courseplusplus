/**
 * Created by Obscurity on 2016/4/5.
 */

var express = require('express');
var controller = require('../controllers');
var user_router = require('./users');
var group_router = require('./groups');
var resource_router = require('./resource');
var request_data_logger = require('../middlewares').request_data_logger;
var course_router = require('./course');
var data        = require('./data');
var download = require('../controllers/download');
var router = express.Router({
    mergeParams: true
});


router.use(request_data_logger);

router.get('/', controller.index);

router.use('/users', user_router);

router.use('/data',data);

router.get('/download/resource/:resource_id', download.single_download);
//router.get('/download/:assignment_id', download.download);

router.use('/groups', group_router);

router.use('/course',course_router);
module.exports = router;