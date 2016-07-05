var express = require('express');
var assignment_controller = require('../../../controllers').assignment;
var submit_router = require('./submit');
var authenticator = require('../../../middlewares/authentication');

var router = express.Router({
  mergeParams: true
});

router.get('/', assignment_controller.index);

router.get('/:id', assignment_controller.show);

router.use('/:id/submit', submit_router);

module.exports = router;