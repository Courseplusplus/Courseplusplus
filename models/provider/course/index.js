/**
 * Created by rikoizz on 16-7-8.
 */
var db = require('../database/index');

var course = db.models.course;

var getAllCourses = function(){
    return course.findAll();
};

var getCourse = function(course_id){
    return course.findOne({where: {course_id : course_id}});
};

module.exports = {
    getAllCourses: getAllCourses,
    getCourse: getCourse
};