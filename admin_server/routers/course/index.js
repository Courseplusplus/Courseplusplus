/**
 * Created by wangzhaoyi on 16/7/7.
 */
var express = require('express');
var controller = require('../../controllers');
var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../middlewares').request_data_logger;

router.get('/',controller.courses.list);
router.post('/',controller.courses.import);

router.get('/:course_id',controller.courses.show);

router.post('/:course_id/teacher',controller.courses.import_teacher);
router.post('/:course_id/student',controller.courses.import_student);


module.exports = router;