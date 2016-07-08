/**
 * Created by zhangxinru on 16/7/5.
 */

var express = require('express');

var router = express.Router({
    mergeParams: true
});
var request_data_logger = require('../../../middlewares').request_data_logger;

router.use(request_data_logger);

module.exports = router;