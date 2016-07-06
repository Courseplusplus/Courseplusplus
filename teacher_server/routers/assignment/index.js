/**
 * Created by xuhanzhi on 16-7-5.
 */

var express = require('express');

var assignment = require('../../controllers/assignment');
    
var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../middlewares').request_data_logger;

router.use(request_data_logger);

// TODO: 研究一下
// 为什么上一层用router.get('download',router)传到这层之后，这层用router.get('/download')还可以运行成功

router.post('/',assignment.index);
router.post('/',assignment.destroy);
router.post('/',assignment.updated);
router.post('/',assignment.create);


module.exports = router;