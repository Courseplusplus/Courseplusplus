/**
 * Created by zhangxinru on 16/7/7.
 */
var express              = require('express');
var resource_controller  = require('../../../controllers/course/resource');

var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../../middlewares').request_data_logger;
router.use(request_data_logger);

router.get('/:resource_id/',resource_controller.resource);
router.get('/:resource_id/download',resource_controller.download);
router.get('/',resource_controller.index);

router.post('/',resource_controller.upload);

module.exports = router;