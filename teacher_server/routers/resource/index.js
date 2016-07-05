/**
 * Created by wangzhaoyi on 16/7/4.
 */
var express = require('express');
var resource_controller = require('../../controllers/index').resource;
var upload_router = require('./upload/index');
var router = express.Router({
    mergeParams: true
});

router.use('/upload', upload_router);

module.exports = router;