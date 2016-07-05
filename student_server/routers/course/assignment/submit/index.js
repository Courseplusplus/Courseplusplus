var express = require('express');
var submit_controller = require('../../../../controllers').submit;

var authenticator = require('../../../../middlewares/authentication');

var router = express.Router({
  mergeParams: true
});

//router.get('/', submit_controller.index);

router.post('/', submit_controller.create);

module.exports = router;