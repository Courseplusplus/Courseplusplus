/**
 * Created by Obscurity on 2016/4/5.
 */

var express = require('express');
var controller = require('../controllers');
var user_router = require('./user');
var request_data_logger = require('../middlewares').request_data_logger;
var course_router = require('./course');
var router = express.Router({
    mergeParams: true
});


router.use(request_data_logger);

router.get('/', controller.index);

router.use('/user', user_router);

router.use('/course',course_router);

module.exports = router;