/**
 * Created by Obscurity on 2016/5/12.
 */

var express = require('express');
var sessions_controller = require('../../../controllers/index').user.session;

var router = express.Router({
    mergeParams: true
});

router.post('/', sessions_controller.create);

router.put('/', sessions_controller.update);

module.exports = router;