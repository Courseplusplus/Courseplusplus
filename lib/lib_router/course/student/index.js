/**
 * Created by rikoizz on 16-7-9.
 */

var express = require('express');
var request_data_logger = require('../../../../teacher_server/middlewares').request_data_logger;
var router = express.Router({
    mergeParams: true
});

var team = require('../../../lib_module/team');
var student = require('../../../lib_module/student');
var course = require('../../../lib_module/course');
router.use(request_data_logger);

//router.use('/course/:course_id/resource', resource_router);

router.get('/', student.courseStudents);

router.get('/:student_id/accepted-team', team.courseStudentACTeam);

router.get('/:student_id/team', team.courseStudentTeam);

module.exports = router;