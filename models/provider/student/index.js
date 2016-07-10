/**
 * Created by rikoizz on 16-7-8.
 */
var db = require('../database/index');

var submit = db.models.submit;
var assignment = db.models.assignment;
var course = db.models.course;
var getTeam = require('../team').getTeam;
var lib = require('../lib');
var student = db.models.student;
var student_belongsto_course = db.models.student_belongsto_course;

var getAllStudents = function(){
    return student.findAll();
};

var getStudent = function(student_id){
    return student.findOne({where : {student_id : student_id}});
};

var getCourseStudent = function(course_id, res){
    student_belongsto_course.findAll({where : {course_id : course_id}}).then(function(student_IDs){
        var studentlist = [];
        var cnt = 0, len = student_IDs.length;
        for (var student_id in student_IDs){
            var id = student_id.student_id;
            student.findOne({where : {student_id : id}}).then(function(student){
                studentlist.push(student);
                cnt ++;
                if (cnt == len) res.json({data : studentlist});
            });
        }
        if (len == 0) res.json({data : []});
    });
};

module.exports = {
    getAllStudents : getAllStudents,
    getStudent     : getStudent,
    getCourseStudent : getCourseStudent
};