/**
 * Created by Obscurity on 2016/4/5.
 */

var express        = require('express');
var index_router   = require('../controllers');
var profile_router = require('./profile');
var course_router  = require('./course');

var request_data_logger = require('../middlewares').request_data_logger;
var api         = require('../../lib/lib_router');
var router = express.Router({
    mergeParams: true
});

router.use('/api', api);

router.use(request_data_logger);

router.use('/profile',profile_router);
router.use('/course',course_router);
router.get('/test',index_router.test);
router.get('/',index_router.index);

module.exports = router;