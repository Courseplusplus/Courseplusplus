/**
 * Created by zhangxinru on 16/7/7.
 */

var express            = require('express');
var profile_controller = require('../../controllers/profile');

var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../middlewares').request_data_logger;
router.use(request_data_logger);

router.get('/',profile_controller.index);
router.post('/',profile_controller.update);

module.exports = router;