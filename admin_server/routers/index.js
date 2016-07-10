/**
 * Created by Obscurity on 2016/4/5.
 */
var express = require('express');
var controller = require('../controllers/');
var course_router = require('./course');
var teacher_router = require('./teacher');
var student_router = require('./student');
var router = express.Router({mergeParams: true});
var api_router = require('../../lib/lib_router');
var request_data_logger = require('../middlewares').request_data_logger;


router.use(request_data_logger);
router.get('/index',controller.index);
router.use('/course',course_router);
router.use('/teacher',teacher_router);
router.use('/student',student_router);
router.use('/data_provider',api_router);
//router.get('/set',controller.display);
router.post('set',controller.set);

module.exports = router;