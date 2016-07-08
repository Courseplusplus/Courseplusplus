/**
 * Created by zhangxinru on 16/7/7.
 */

var express            = require('express');
var team_controller  = require('../../../controllers/course/team');

var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../../middlewares').request_data_logger;
router.use(request_data_logger);

router.get('/:team_id',team_controller.info);
router.get('/',team_controller.index);

router.post('/:team_id',team_controller.reject);

module.exports = router;