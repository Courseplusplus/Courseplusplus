/**
 * Created by zhangxinru on 16/7/5.
 */

var express = require('express');
var controller = require('../../controllers/data');
var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../middlewares').request_data_logger;

router.use(request_data_logger);

router.get('/allcourses',controller.allCourses);
router.get('/allassignments/:course_id',controller.allAssignments);

module.exports = router;