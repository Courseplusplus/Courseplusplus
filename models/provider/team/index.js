/**
 * Created by rikoizz on 16-7-8.
 */
var db = require('../database/index');

var team = db.models.team;
var student_belongsto_teams = db.models.student_belongsto_team;
var getAllTeams = function(course_id){
    return team.findAll({where: {course_id : course_id}});
};

var getTeam = function(team_id){
    return team.findOne({where : {team_id : team_id}});
};

var getStudentACTeam = function(course_id, student_id, res){
    student_belongsto_teams.findAll({where: {student_id : student_id}}).then(function(teamIDs){
        console.log('1');
        var cnt = 0;
        var len = teamIDs.length;
        for (var teamID in teamIDs){
            team.findOne({where: {team_id : teamID}}).then(function(team){
                if (team.course_id == course_id && team.permission == "Permited"){
                    team.findOne({where : {team_id : team_id}}).then(function(team){
                        res.json({data : team});
                    });
                }else{
                    cnt++;
                    if (cnt == len) res.json({data: null});
                }
            });
        }
        if (len == 0) res.json({data: null});
    });
};

module.exports = {
    getAllTeams : getAllTeams,
    getTeam: getTeam,
    getStudentACTeam : getStudentACTeam
};