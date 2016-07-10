/**
 * Created by rikoizz on 16-7-8.
 */
var db = require('../database/index');

var course = db.models.course;
var student_belongsto_course = db.models.student_belongsto_course;
var teacher_belongsto_course = db.models.teacher_belongsto_course;

var getAllCourses = function(){
    return course.findAll();
};

var getCourse = function(course_id){
    return course.findOne({where: {course_id : course_id}});
};

var getStudentCourse = function(student_id, res){
    //console.log('1');
    student_belongsto_course.findAll({where : {student_id : student_id}}).then(function(course_IDs) {
       // console.log('2'); console.log(course_IDs);
        var course_list = [];
        var cnt = 0, len = course_IDs.length;
        for (var course_id in course_IDs) {
           // console.log(course_id);
            var id = course_id.id;
            course.findOne({where : {course_id : id}}).then(function(course){
                course_list.push(course);
                cnt ++;
                if (cnt == len){
                    //console.log("success");
                    res.json({data : course_list});
                }
            });
        }
        if (len == 0) res.json({data : []});
    });
};
var getTeacherCourse = function(teacher_id, res){
    teacher_belongsto_course.findAll({where : {teacher_id : teacher_id}}).then(function(course_IDs){
        var course_list = [];
        var cnt = 0, len = course_IDs.length;
        for (var course_id in course_IDs) {
          //  console.log(course_id);
            var id = course_id.id;
            course.findOne({where : {course_id : id}}).then(function(course){
                course_list.push(course);
                cnt ++;
                if (cnt == len){
                    res.json({data : course_list});
                }
            });
        }
        if (len == 0) res.json({data : []});
    });
};

module.exports = {
    getAllCourses: getAllCourses,
    getCourse: getCourse,
    getStudentCourse : getStudentCourse,
    getTeacherCourse : getTeacherCourse
};