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
        var course_id = req.params.course_id;
        getAllAssignments(course_id).then(function(assignments){
            var assignmentlist = [];
            for (var index in assignments){
                assignmentlist.push(assignments[index]);
            }
            var data = [{
                name:"第一次作业",
                id  : 1,
                path:"/Users/zhangxinru/Project/Courseplusplus/resources/",
                date:"2016-07-05 10:00:00"
            },{
                name:"第二次作业",
                id  : 2,
                path:"/Users/zhangxinru/Project/Courseplusplus/resources/",
                date:"2016-07-05 10:00:00"
            }];
            //res.json({msg:'success',data:assignmentlist});
            res.json({msg:'success',data:data});
        });
    }
};
module.exports = data;