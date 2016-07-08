/**
 * Created by zhangxinru on 16/7/7.
 */

var express            = require('express');
var assignment_controller  = require('../../../controllers/course/assignment');

var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../../middlewares').request_data_logger;
router.use(request_data_logger);

router.get('/:assignment_id',assignment_controller.all); // 查看所有的团队作业提交情况
router.get('/:assignment_id/team',assignment_controller.all);
router.get('/:assignment_id/team/:team_id',assignment_controller.info);
router.get('/:assignment_id/team/:team_id/download',assignment_controller.download);
router.get('/',assignment_controller.index);

router.post('/:assignment_id',assignment_controller.update);
router.post('/:assignment_id/team/:team_id/mark',assignment_controller.mark); // 给团队作业做评语
router.post('/',assignment_controller.upload);

module.exports = router;