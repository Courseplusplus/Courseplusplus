/**
 * Created by rikoizz on 16-7-8.
 */
var db = require('../database/index');

var submit = db.models.submit;
var assignment = db.models.assignment;
var course = db.models.course;
var getTeam = require('../team').getTeam;
var lib = require('../lib');
var teacher = db.models.teacher;
var teacher_belongsto_course = db.models.teacher_belongsto_course;

var getAllTeachers = function(){
    return teacher.findAll();
};

var getTeacher = function(teacher_id){
    return teacher.findOne({where : {teacher_id : teacher_id}});
};
var getCourseTeacher = function(course_id, res){
    teacher_belongsto_course.findAll({where : {course_id : course_id}}).then(function(teacher_IDs){
        var cnt = 0, len = teacher_IDs.length;
        for (var teacher_id in teacher_IDs){
            var id = teacher_id.id;
            teacher.findOne({where : {teacher_id : id}}).then(function(teacher){
                teacherlist.push(teacher);
                cnt ++;
                if (cnt == len) res.json({data : teacherlist});
            });
        }
        if (len == 0) res.json({data : []});
    });
};

module.exports = {
    getAllTeachers : getAllTeachers,
    getTeacher     : getTeacher,
    getCourseTeacher : getCourseTeacher
};