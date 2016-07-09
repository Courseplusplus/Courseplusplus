/**
 * Created by rikoizz on 16-7-8.
 */
var db = require('../database');

var course = db.models.course;

var getAllCourses = function(){
    return course.findAll();
};

var getCourse = function(){
    return course.findOne({where: {course_id : course_id}});
};

module.exports = {
    getAllCourses: getAllCourses,
    getCourse: getCourse
};