/**
 * Created by wangzhaoyi on 16/7/7.
 */
var express = require('express');
var controller = require('../../controllers');
var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../middlewares').request_data_logger;

router.get('/',controller.teachers.list);
router.post('/',controller.teachers.import);

router.get('/:teacher_id',controller.teachers.show);

module.exports = router;