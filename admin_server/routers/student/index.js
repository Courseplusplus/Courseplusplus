/**
 * Created by wangzhaoyi on 16/7/7.
 */
var express = require('express');
var controller = require('../../controllers');
var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../middlewares').request_data_logger;

router.get('/',controller.students.list);
router.post('/',controller.students.import);

router.get('/:student',controller.students.show);


module.exports = router;