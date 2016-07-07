/**
 * Created by Obscurity on 2016/5/12.
 */

var express = require('express');
var membership_router = require('./memberships/index');
var groups_controller = require('../../controllers/index').groups;
var authenticator = require('../../middlewares/authentication');

var router = express.Router({
    mergeParams: true
});

router.get('/', authenticator, groups_controller.index);

router.get('/:group_id', authenticator, groups_controller.show);

router.post('/', authenticator, groups_controller.create);

router.put('/:group_id', authenticator, groups_controller.update);

router.use('/:group_id/memberships', membership_router);

module.exports = router;