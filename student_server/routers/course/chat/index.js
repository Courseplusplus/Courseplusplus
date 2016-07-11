/**
 * Created by peter on 7/10/16.
 */
var express = require('express');
var chat_controller = require('../../../controllers').course.chat;
var authenticator = require('../../../middlewares/authentication');

var router = express.Router({
	mergeParams: true
});

router.get('/', chat_controller.index);

module.exports = router;