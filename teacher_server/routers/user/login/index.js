/**
 * Created by Obscurity on 2016/5/12.
 */

var express = require('express');
var login_controller = require('../../../controllers/index').user.session;

var router = express.Router({
    mergeParams: true
});

router.get('/', login_controller.index);

router.get('/logout',login_controller.logout);

router.post('/', login_controller.create);

router.put('/', login_controller.update);

module.exports = router;