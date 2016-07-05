/**
 * Created by heavenduke on 16-5-25.
 */


var express = require('express');
var password_controller = require('../../../controllers/index').user.password;
var authenticator = require('../../../middlewares/password_reset');

var router = express.Router({
    mergeParams: true
});

router.put('/', authenticator, password_controller.update);

module.exports = router;