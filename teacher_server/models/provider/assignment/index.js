/**
 * Created by rikoizz on 16-7-8.
 */


var db = require('../database');

var assignment = db.models.assignment;

var getAllAssignments = function(course_id){
    return assignment.findAll({where:{course_id : course_id}});
};

var getAssignment = function(assignment_id){
    return assignment.findOne({where:{assignment_id: assignment_id}});
};

module.exports = {
    getAllAssignments:getAllAssignments,
    getAssignment:getAssignment
};