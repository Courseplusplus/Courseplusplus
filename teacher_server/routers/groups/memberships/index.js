/**
 * Created by Obscurity on 2016/5/12.
 */

var express = require('express');
var memberships_controller = require('../../../controllers/index').groups.memberships;
var authenticator = require('../../../middlewares/authentication');

var router = express.Router({
    mergeParams: true
});

router.get('/', authenticator, memberships_controller.index);

router.post('/', authenticator, memberships_controller.create);

router.delete('/:membership_id', authenticator, memberships_controller.destroy);

module.exports = router;