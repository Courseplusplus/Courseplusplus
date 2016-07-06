var express = require('express');
var course_controller = require('../../controllers/course');
var assignment_router = require('./assignment');
var resource_router = require('./resource');


var router = express.Router({
    mergeParams: true
});

router.get('/:id/',course_controller.index);
router.use('/:id/assignment', assignment_router);
router.use('/:course_id/resource', resource_router);

module.exports = router;