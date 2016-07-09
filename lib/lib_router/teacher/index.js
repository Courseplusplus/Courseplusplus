/**
 * Created by rikoizz on 16-7-9.
 */

var express = require('express');
var request_data_logger = require('../../../teacher_server/middlewares').request_data_logger;
var router = express.Router({
    mergeParams: true
});

var teacher = require('../../lib_module/teacher');
var course = require('../../lib_module/course');

router.use(request_data_logger);

//router.use('/course/:course_id/resource', resource_router);

router.get('/', teacher.allTeachers);

router.get('/:teacher_id', teacher.teacher);

router.get('/:teacher_id/course', course.teacherCourse);

module.exports = router;