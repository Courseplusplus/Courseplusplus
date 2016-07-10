var express = require('express');
var course_controller = require('../../controllers/course');
var assignment_router = require('./assignment');
var resource_router = require('./resource');
var team_router = require('./team');
var chat_router = require('./chat');

var router = express.Router({
    mergeParams: true
});



router.get('/',course_controller.index);
router.get('/:id/',course_controller.single);
router.use('/:id/assignment', assignment_router);
router.use('/:id/team',team_router);
router.use('/:id/resource', resource_router);
router.use('/:id/chat', chat_router);

module.exports = router;