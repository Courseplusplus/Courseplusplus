/**
 * Created by rikoizz on 16-7-8.
 */

var express = require('express');
var request_data_logger = require('../../../../../teacher_server/middlewares').request_data_logger;
var router = express.Router({
    mergeParams: true
});

var submit = require('../../../../lib_module/submit');

router.use(request_data_logger);

//router.use('/course/:course_id/resource', resource_router);

router.get('/', submit.allSubmits);

router.get('/:submit_id', submit.submit);

module.exports = router;