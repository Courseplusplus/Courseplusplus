/**
 * Created by zhangxinru on 16/7/5.
 */

var express = require('express');
var controller = require('../../controllers/views');
var course_router = require('./course');
var course  = require('../../controllers/views/courses');
var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../middlewares').request_data_logger;

router.use(request_data_logger);

router.get('/assignments/',controller.index);
router.get('/assignment/:assignment_id',controller.assignments);
router.get('/courses',course.allcourses);

router.use('/course/:course_id',course_router);

module.exports = router;