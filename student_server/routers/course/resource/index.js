/**
 * Created by peter on 7/6/16.
 */
var express = require('express');
var assignment_controller = require('../../../controllers').assignment;
var resource_controller = require('../../../controllers/resource');
var authenticator = require('../../../middlewares/authentication');

var router = express.Router({
  mergeParams: true
});

router.get('/', resource_controller.resources);

//router.get('/:id', assignment_controller.show);


module.exports = router;