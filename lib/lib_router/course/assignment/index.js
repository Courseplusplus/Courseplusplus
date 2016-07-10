/**
 * Created by rikoizz on 16-7-8.
 */
var express = require('express');
var request_data_logger = require('../../../../teacher_server/middlewares').request_data_logger;
var router = express.Router({
    mergeParams: true
});

var assignment = require('../../../lib_module/assignment');
var submit_router = require('./submit');

//router.use(request_data_logger);

//router.use('/course/:course_id/resource', resource_router);

router.get('/', assignment.allAssignments);

router.get('/:assignment_id', assignment.assignment);

router.use('/:assignment_id/submit',submit_router);

module.exports = router;