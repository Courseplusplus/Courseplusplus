/**
 * Created by wangzhaoyi on 16/7/5.
 */
var express = require('express');
var upload_controller = require('../../../controllers/index').resource.upload;

var router = express.Router({
    mergeParams: true
});

router.post('/', upload_controller.upload);
router.get('/',upload_controller.upload);

module.exports = router;