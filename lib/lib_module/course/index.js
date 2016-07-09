
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

module.exports = {
    allCourses: getAllCourses,
    course: getCourse
};