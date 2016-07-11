/**
 * Created by peter on 7/6/16.
 */
var express = require('express');
var resource_controller = require('../../../controllers').course.resource;
var authenticator = require('../../../middlewares/authentication');

var router = express.Router({
  mergeParams: true
});

router.get('/', resource_controller.index);

router.get('/:resource_id', resource_controller.show);


module.exports = router;