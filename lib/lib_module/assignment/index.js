/**
 * Created by rikoizz on 16-7-8.
 */

var test = function(){
    console.log(__filename);
};

var getAllAssignments = test;
var getAssignment = test;

module.exports = {
    allAssignments: getAllAssignments,
    assignment: getAssignment
};