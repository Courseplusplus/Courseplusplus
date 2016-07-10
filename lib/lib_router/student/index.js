/**
 * Created by rikoizz on 16-7-9.
 */
/**
 * Created by rikoizz on 16-7-9.
 */

var express = require('express');
var request_data_logger = require('../../../teacher_server/middlewares').request_data_logger;
var router = express.Router({
    mergeParams: true
});

var student = require('../../lib_module/student');
var course = require('../../lib_module/course');
router.use(request_data_logger);

//router.use('/course/:course_id/resource', resource_router);

router.get('/', student.allStudents);

router.get('/:student_id', student.student);

router.get('/:student_id/course', course.studentCourse);

module.exports = router;