/**
 * Created by zhangxinru on 16/7/5.
 */

var express = require('express');
var controller = require('../../../controllers/views');
var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../../middlewares').request_data_logger;

router.use(request_data_logger);

router.get('/',controller.index);
router.get('/assignment/:assignment_id',controller.submits);
router.get('/assignments',controller.assignments);

module.exports = router;