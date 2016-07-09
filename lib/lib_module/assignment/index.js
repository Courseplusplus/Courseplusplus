/**
 * Created by rikoizz on 16-7-8.
 */

var test = function(req, res){
    res.json(__filename);
};
var assignment = require('../../../models/provider/assignment');
var getAllAssignments = function(req, res){
    var course_id = req.params.course_id;
    assignment.getAllAssignments(course_id).then(function(assignments){
        res.json({data: assignments});
    });
};
var getAssignment = function(req, res){
    var assignment_id = req.params.assignment_id;
    console.log(assignment_id);
    assignment.getAssignment(assignment_id).then(function(assignment){
        res.json({data: assignment});
    });
};

module.exports = {
    allAssignments: getAllAssignments,
    assignment: getAssignment
};