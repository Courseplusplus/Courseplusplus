/**
 * Created by rikoizz on 16-7-8.
 */

var express = require('express');
var request_data_logger = require('../../../teacher_server/middlewares').request_data_logger;
var router = express.Router({
    mergeParams: true
});

var team = require('../../../lib_module/team');

router.use(request_data_logger);

//router.use('/course/:course_id/resource', resource_router);

router.get('/', team.allTeam);

router.get('/:team_id', team.team);

module.exports = router;