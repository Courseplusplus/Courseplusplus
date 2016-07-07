/**
 * Created by wangzhaoyi on 16/7/7.
 */
var express = require('express');
var view_controller = require('../../controllers/views');
var controller = require('../../controlers');
var course_controller = require('../../controllers/courses');
var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../middlewares').request_data_logger;

router.get('/',controller.courses.list);
router.post('/',controller.courses.import);

router.get('/:course_id',controller.courses.show);
router.post('/:course_id',controller.courses.update);