/**
 * Created by rikoizz on 16-7-8.
 */

/**
 * Created by Obscurity on 2016/4/5.
 */
var path = require('path');
var express = require('express');
var request_data_logger = require('../../teacher_server/middlewares').request_data_logger;
var router = express.Router({
    mergeParams: true
});
console.log(path.resolve('./lib/lib_module/course'));
var course = require('../lib_module/course');
var term = require('../lib_module/term');
var assignment_router = require('./course/assignment');
var resource_router = require('./course/resource');
var team_router = require('./course/team');
var course_student = require('./course/student');
var course_teacher = require('./course/teacher');
var teacher_router = require('./teacher');
var student_router = require('./student');

router.use(request_data_logger);

router.get('/course', course.allCourses);

router.get('/course/:course_id', course.course);

router.use('/course/:course_id/resource', resource_router);

router.use('/course/:course_id/team', team_router);

router.use('/course/:course_id/assignment',assignment_router);

router.use('/course/:course_id/student', course_student);

router.use('/course/:course_id/teacher', course_teacher);

router.use('/teacher', teacher_router);

router.use('/student', student_router);

router.get('/current_week', term.getCurrentWeek);

module.exports = router;