var express = require('express');
var course_controller = require('../../controllers/course');
var assignment_router = require('./assignment');
var resource_router = require('./resource');
var team_router = require('./team');
var chat_router = require('./chat');
var authenticator = require('../../middlewares/authentication');
var router = express.Router({
    mergeParams: true
});



router.get('/',authenticator,course_controller.index);
router.get('/:course_id/',authenticator,course_controller.single);
router.use('/:course_id/assignment',authenticator, assignment_router);
router.use('/:course_id/team',authenticator,team_router);
router.use('/:course_id/resource',authenticator, resource_router);
router.use('/:course_id/chat',authenticator, chat_router);

module.exports = router;