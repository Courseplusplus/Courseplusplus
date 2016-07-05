var express = require('express');
var course_controller = require('../../controllers/course');
var assignment_router = require('./assignment');


var router = express.Router({
    mergeParams: true
});

router.get('/:id/',course_controller.index);

router.use('/:id/assignment', assignment_router);

module.exports = router;