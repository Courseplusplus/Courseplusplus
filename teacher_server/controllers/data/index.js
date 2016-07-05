/**
 * Created by rikoizz on 16-7-5.
 */

var path = require('path');
var adm_zip = require('adm-zip');
var fs = require('fs');
var zip = new adm_zip();

var config = require('../../config.json');
var db = require('../../models')(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    config.mysql.config
);
var Submit      = db.models.submit;
var courses     = db.models.course;
var assignments = db.models.assignment;

var getAllCourses = function(){

    return courses.findAll();
};

var getAllAssignments = function(course_id){
    return assignments.findAll({course_id: course_id});
};

var data = {
    allCourses:function(req, res){
        getAllCourses().then(function(courses){
            console.log('here');
            var courselist = [];
            for (var index in courses){
                var data = {course_name:courses[index]['course_name'],
                            course_id:"http://127.0.0.1:3001/course/" + courses[index]['course_id']};
                courselist.push(data);
            }
            res.json({msg:'success',data:courselist});
        });
        //res.json({msg: "hellos"});
    },
    allAssignments: function(req, res){
        var course_id = req.params.course;
        getAllAssigments(course_id).then(function(assignments){
            var assignmentlist = [];
            for (var index in assignments){
                assignmentlist.push(assignments[index]);
            }
            res.json({msg:'success',data:assignmentlist});
        });
    }
};
module.exports = data;