var express = require('express');
var assignment_controller = require('../../../controllers').course.assignment;
var authenticator = require('../../../middlewares/authentication');

var router = express.Router({
  mergeParams: true
});

router.get('/', assignment_controller.index);

router.get('/:id', assignment_controller.show);

router.get('/:id/download', assignment_controller.download);

router.post('/:id', assignment_controller.create);

module.exports = router;