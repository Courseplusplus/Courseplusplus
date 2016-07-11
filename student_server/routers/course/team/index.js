/**
 * Created by peter on 7/8/16.
 */
var express = require('express');
var team_controller = require('../../../controllers').course.team;
var authenticator = require('../../../middlewares/authentication');

var router = express.Router({
	mergeParams: true
});


// 查看所有队伍
router.get('/', team_controller.index);

// 创建队伍
router.post('/', team_controller.create);

router.post('/:team_id/team_apply', team_controller.team_apply);

// 查看id的队伍
router.get('/:team_id', team_controller.show);

// 申请加入队伍
router.post('/:team_id', team_controller.apply);

// 队长审核组队请求
router.post('/:team_id/student/:student_id', team_controller.check);

router.post('/:team_id/leader', team_controller.leader);

module.exports = router;