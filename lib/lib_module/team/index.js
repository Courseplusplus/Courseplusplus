/**
 * Created by rikoizz on 16-7-8.
 */

var test = function(req, res){
    res.json(__filename);
};
var team   = require('../../../models/provider/team');
var course = require('../../../models/provider/course');

var getAllTeams = function(req, res){
    var course_id = req.params.course_id;
    console.log('here'+course_id);
    team.getAllTeams(course_id).then(function(teams){
        course.getCourse(course_id).then(function(course){
            res.json({data: {teams:teams,course:course}});
        });
    });
};
var getTeam = function(req, res){
    var team_id = req.params.team_id;
    team.getTeam(team_id).then(function(team){
        res.json({data: team});
    });
};
var getCourseStudentACTeam = function(req, res){
    var course_id = req.params.course_id;
    var student_id = req.params.student_id;
    //console.log('here');
    team.getCourseStudentACTeam(course_id, student_id, res);
    //res.json(__filename + 'getStudentACTeam');
};
var getCourseNotDecideTeams = function(req, res){
    var course_id = req.params.course_id;
    team.getCourseNotDecideTeams(course_id, res);
};
var getCourseStudentTeam = function(req, res){
    var course_id = req.params.course_id;
    var student_id = req.params.student_id;
    team.getCourseStudentTeam(course_id, student_id, res);
};

module.exports = {
    allTeams: getAllTeams,
    team: getTeam,
    courseStudentACTeam : getCourseStudentACTeam,
    courseNotDecideTeams : getCourseNotDecideTeams,
    courseStudentTeam : getCourseStudentTeam
};