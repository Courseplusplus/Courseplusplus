var express = require('express');
var course_controller = require('../../controllers/course');



var router = express.Router({
    mergeParams: true
});

router.get('/',course_controller.index);

module.exports = router;