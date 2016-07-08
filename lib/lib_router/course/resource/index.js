/**
 * Created by rikoizz on 16-7-8.
 */
var express = require('express');
var request_data_logger = require('../../../teacher_server/middlewares').request_data_logger;
var router = express.Router({
    mergeParams: true
});

var resource = require('../../../lib_module/resource');

router.use(request_data_logger);

//router.use('/course/:course_id/resource', resource_router);

router.get('/', resource.allResources);

router.get('/:resource_id', resource.resource);

module.exports = router;