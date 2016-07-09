/**
 * Created by rikoizz on 16-7-8.
 */


var test = function(req, res){
    res.json(__filename);
};
var teacher = require('../../../models/provider/teacher');
var getAllTeachers = function(req, res){
    teacher.getAllTeachers().then(function(teachers){
        res.json({data : teachers});
    });
};
var getTeacher = function(req, res){
    var teacher_id = req.params.teacher_id;
    teacher.getTeacher(teacher_id).then(function(teacher){
        res.json({data: teacher});
    });
};
var getCourseTeacher = function(req, res){
    var course_id = req.params.course_id;
    teacher.getCourseTeacher(course_id, res);
};

module.exports = {
    allTeachers: getAllTeachers,
    teacher: getTeacher,
    courseTeacher : getCourseTeacher
};