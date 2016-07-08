/**
 * Created by rikoizz on 16-7-8.
 */

/**
 * Created by Obscurity on 2016/4/5.
 */

var express = require('express');
var request_data_logger = require('../../teacher_server/middlewares').request_data_logger;
var router = express.Router({
    mergeParams: true
});
var course = require('../lib_module/course');
var assignment_router = require('./assignment');
var resource_router = require('./resource');
var team_router = require('./team');

router.use(request_data_logger);

router.get('/course', course.allCourses);

router.get('/course/:course_id', course.course);

router.use('/course/:course_id/resource', resource_router);

router.use('/course/:course_id/team', team_router);

router.use('/course/:course_id/assignment',assignment_router);

module.exports = router;