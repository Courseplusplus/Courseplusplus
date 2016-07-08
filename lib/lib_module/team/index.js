/**
 * Created by rikoizz on 16-7-8.
 */

var test = function(){
    console.log(__filename);
};

var getAllTeams = test;
var getTeam = test;

module.exports = {
    allTeams: getAllTeams,
    team: getTeam
};