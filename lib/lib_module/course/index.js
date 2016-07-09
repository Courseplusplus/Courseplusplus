
var test = function(req, res){
    res.json(__filename);
};
var course = require('../../../models/provider/course');
var getAllCourses = function(req, res){
    course.getAllCourses().then(function(courses){
        res.json({data: courses});
    });
};
var getCourse = function(req, res){
    var course_id = req.params.course_id;
    course.getCourse(course_id).then(function(course){
        res.json({data : course});
    });
};
var getStudentCourse = function(req, res){
    var student_id = req.params.student_id;
    course.getStudentCourse(student_id, res);
};
var getTeacherCourse = function(req, res){
    var teacher_id = req.params.teacher_id;
    //console.log('1');
    course.getTeacherCourse(teacher_id, res);
};
module.exports = {
    allCourses: getAllCourses,
    course: getCourse,
    studentCourse : getStudentCourse,
    teacherCourse : getTeacherCourse
};