/**
 * Created by rikoizz on 16-7-8.
 */


var test = function(req, res){
    res.json(__filename);
};
var student = require('../../../models/provider/student');
var getAllStudents = function(req, res){
    student.getAllStudents().then(function(students){
        res.json({data : students});
    });
};
var getStudent = function(req, res){
    var student_id = req.params.student_id;
    student.getStudent(student_id).then(function(student){
        res.json({data: student});
    });
};
var getCourseStudent = function(req, res){
    var course_id = req.params.course_id;
    student.getCourseStudent(course_id, res);
};

module.exports = {
    allStudents: getAllStudents,
    student: getStudent,
    courseStudents: getCourseStudent
};