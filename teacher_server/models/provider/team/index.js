/**
 * Created by rikoizz on 16-7-8.
 */
var db = require('../database');

var team = db.models.team;

var getAllTeams = function(course_id){
    return team.findAll({where: {course_id : course_id}});
};

var getTeam = function(team_id){
    return team.findOne({where : {team_id : team_id}});
};

module.exports = {
    getAllTeams : getAllTeams,
    getTeam: getTeam
};