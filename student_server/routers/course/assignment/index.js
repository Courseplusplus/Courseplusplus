var express = require('express');
var assignment_controller = require('../../../controllers').course.assignment;
var authenticator = require('../../../middlewares/authentication');

var router = express.Router({
    mergeParams: true
});

router.get('/', assignment_controller.index);

router.get('/:assignment_id', assignment_controller.show);

router.get('/:assignment_id/download', assignment_controller.download);

router.get('/:assignment_id/download_intro', assignment_controller.download_intro);

router.post('/:assignment_id', assignment_controller.create);

module.exports = router;