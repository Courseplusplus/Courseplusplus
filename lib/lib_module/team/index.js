/**
 * Created by rikoizz on 16-7-8.
 */

var test = function(req, res){
    res.json(__filename);
};
var team = require('../../../models/provider/team');
var getAllTeams = function(req, res){
    var course_id = req.params.course_id;
    team.getAllTeams(course_id).then(function(teams){
        res.json({data: teams});
    });
};
var getTeam = function(req, res){
    var team_id = req.params.team_id;
    team.getTeam(team_id).then(function(team){
        res.json({data: team});
    });
};
var getStudentACTeam = function(req, res){
    var course_id = req.params.course_id;
    var student_id = req.params.student_id;
    //console.log('here');
    team.getStudentACTeam(course_id, student_id, res);
    //res.json(__filename + 'getStudentACTeam');
};
var getCourseNotDecideTeams = function(req, res){
    var course_id = req.params.course_id;
    team.getCourseNotDecideTeams(course_id, res);
};
var getStudentTeam = function(req, res){
    var course_id = req.params.course_id;
    var student_id = req.params.student_id;
    team.getStudentTeam(course_id, student_id, res);
};

module.exports = {
    allTeams: getAllTeams,
    team: getTeam,
    studentACTeam : getStudentACTeam,
    courseNotDecideTeams : getCourseNotDecideTeams,
    studentTeam : getStudentTeam
};