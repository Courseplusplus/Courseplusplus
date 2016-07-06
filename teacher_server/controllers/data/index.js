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
var submits      = db.models.submit;
var courses     = db.models.course;
var assignments = db.models.assignment;
var resources = db.models.resource;

var getAllCourses = function(){

    return courses.findAll();
};

var getAllAssignments = function(course_id){
    return assignments.findAll({where:{course_id: course_id}}); //order
};

var getAllSubmits = function(assignment_id){
    return submits.findAll({where:{assignment_id: assignment_id}});
}
var getAllResources = function(course_id){
    return resources.findAll({where:{course_id : course_id}});
}

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
            /*var i = 0;
            for (var index in assignments){
                courses.findOne({course_id: assignments[index]['course_id']}).then(function(course){
                    var data = {
                        'name': course['name'] + 'NO.' + assignments[index]['lesson_id'],
                        'upload_time': assignments[index]['upload_time'],
                        'file_path': assignments[index]['file_path']
                    };
                    assignmentlist.push(data);
                    i++;
                    if (i == assignments.length){
                        console.log(i);
                        res.json({msg:'success',data:assignmentlist});
                    }
                });
            }*/
            var len = assignments.length;
            //sconsole.log(len);
            var f = function(index){
                //console.log(index);
                if (index < len){
                    courses.findOne({where:{course_id: assignments[index]['course_id']}}).then(function(course){
                        //console.log(course);
                        var data = {
                            'name': course['course_name'] + " 第" + assignments[index]['lesson_id'] + "次作业",
                            'upload_time': assignments[index]['upload_time'],
                            'file_path': assignments[index]['file_path']
                        };
                        assignmentlist.push(data);
                        f(index+1);
                    });
                }else{
                    res.json({msg:'success',data:assignmentlist});
                }
            };
            f(0);
        });
    },
    allSubmits: function(req, res){
        var assignment_id =  req.params.assignment_id;
        getAllSubmits(assignment_id).then(function(submits){
            var submitlist = [];
            for (var index in submits){
                var data = {
                    'team_id': submits[index]['team_id'],
                    'file_path': submits[index]['file_path']
                };
                submitlist.push(data);
            }
            res.json({msg:'success', data: submitlist});
        });
    },
    allResources: function(req, res){
        var course_id =  req.params.course_id;
        getAllResources(course_id).then(function(resources){
            var resourcelist = [];
            for (var index in resources){
                var data = {
                    'resource_name': resources[index]['resource_name'],
                    'resource_type': resources[index]['resource_type'],
                    'file_path': resources[index]['file_path']
                };
                resourcelist.push(data);
            }
            res.json({msg:'success', data: resourcelist});
        });
    }

};
module.exports = data;