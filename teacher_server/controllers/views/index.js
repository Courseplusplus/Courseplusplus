/**
 * Created by zhangxinru on 16/7/5.
 */

var request = require('request');

var config = require('../../config.json');
var db = require('../../models')(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    config.mysql.config
);
var Assignments = db.models.assignment;
var Courses     = db.models.course;

var host = "http://127.0.0.1:3001";

var index = {
    index:function(req,res){
        if(req.params.course_id) {
            var course_id = req.params.course_id;
            Courses.findOne({course_id:course_id}).then(function(course){
                if(course) {
                    res.render('course/index',{intro:course.introduction,name:course.course_name,params:req.params});
                }else{
                    res.render('course/index', {intro:"非法访问！"});
                }
            });
        }else {
            res.render('course/index', {intro:"非法访问！"});
        }
    },
    assignments: function(req,res){
        var course_id = req.params.course_id;
        request(host+"/data/allassignments/"+course_id,function(err,response,body){
            if (!err && response.statusCode == 200) {
                res.render('course/assignments',{list:JSON.parse(body)["data"],params:req.params});
            }
        });
    },
    submits:function(req,res){
        var assignment_id = req.params.assignment_id;
        request(host+"/download/list/"+assignment_id,function(err,response,body){
            if (!err && response.statusCode == 200) {
                res.render('course/submits',{list:JSON.parse(body)["data"],assignment_id:assignment_id,params:req.params});
            }
        });
    },
    resources:function(req,res){
        var course_id = req.params.course_id;
        request(host+"/data/allresources/"+course_id,function(err,response,body){
            if (!err && response.statusCode == 200) {
                res.render("course/resources",{list:JSON.parse(body)["data"],params:req.params});
            }
        });
    }
};

module.exports =  index;