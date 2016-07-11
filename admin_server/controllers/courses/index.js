/**
 * Created by wangzhaoyi on 16/7/8.
 */
var request = require('request');
var PasswordValidator = require('../../libs').PasswordValidator;
var ResultConstructor = require('../../libs').ResultConstructor;
var formidable = require('formidable');
var fs = require('fs');
var csvParser = require('csv-parse');
var path = require('path');
var host = "http://127.0.0.1:3002";

exports.list = function(req,res,next){
    request(host+'/data_provider/course',function(err,response,body){
        if (!err && response.statusCode == 200) {
            res.render('course/index',{list:JSON.parse(body)["data"]});
        }
    });
};

exports.show = function(req,res,next){
    var course_id = req.params.course_id;
    request(host + '/data_provider/course/'+course_id,function (err,response,body) {
        var course_json = JSON.parse(body)["data"];
        request(host +'/data_provider/course/'+course_id+'/student',function(err,response,body){
            var student_json = JSON.parse(body)["data"];
            request(host +'/data_provider/course/'+course_id+'/teacher',function(err,response,body){
                var teacher_json = JSON.parse(body)["data"];
                res.render('course/profile',{course:course_json,teacher:teacher_json,student:student_json});
            });
        });
    });
};

exports.import = function(req,res){
    var form = new formidable.IncomingForm();
    var file_name = 'course.csv';
    form.uploadDir = path.join(__dirname , '../../tmp');
    form.keepExtensions = true;
    form.type = true;
    form.parse(req, function(err, fields, files) {
    });
    form.on('end',function(){
            var rs = fs.createReadStream(form.uploadDir +'/'+ file_name);
            var parser = csvParser({columns: true}, function(err, data){
                //console.log(data);
                var Course = global.db.models.course;
                Course.bulkCreate(data).then(function(){
                    request(host+'/data_provider/course',function(err,response,body){
                        if (!err && response.statusCode == 200) {
                            res.render('course/index',{list:JSON.parse(body)["data"]});
                        }
                    });
                });
            });
            rs.pipe(parser);
        })
        .on('file', function(field, file) {
            //rename the incoming file to the file's name
            fs.rename(file.path, form.uploadDir + "/" + file_name);
        });
};

exports.import_student = function(req,res){
    var form = new formidable.IncomingForm();
    var file_name = req.params.course_id+'.csv';
    var Course = global.db.models.course;
    var Student = global.db.models.student;
    form.uploadDir = path.join(__dirname , '../../tmp');
    form.keepExtensions = true;
    form.type = true;
    form.parse(req, function(err, fields, files) {
    });
    form.on('end',function(){
            var rs = fs.createReadStream(form.uploadDir +'/'+ file_name);
            var parser = csvParser({columns: true}, function(err, data){
                //console.log(req.params.course_id);
                Course.findOne({where:{course_id:req.params.course_id}}).then(function(course){
                    //console.log(course);
                    for(index in data){
                        Student.findOne({where:{student_id:data[index]['student_id']}}).then(function(student){
                            if(student) {
                                course.addStudent(student);
                                //console.log(course);
                            }
                        })
                    }
                }).then(function(){
                    var course_id = req.params.course_id;
                    request(host + '/data_provider/course/'+course_id,function (err,response,body) {
                        var course_json = JSON.parse(body)["data"];
                        request(host +'/data_provider/course/'+course_id+'/student',function(err,response,body){
                            var student_json = JSON.parse(body)["data"];
                            request(host +'/data_provider/course/'+course_id+'/teacher',function(err,response,body){
                                var teacher_json = JSON.parse(body)["data"];
                                res.render('course/profile',{course:course_json,teacher:teacher_json,student:student_json});
                            });
                        });
                    });
                });
            });
            rs.pipe(parser);
        })
        .on('file', function(field, file) {
            //rename the incoming file to the file's name
            fs.rename(file.path, form.uploadDir + "/" + file_name);
        });
};

exports.import_teacher = function(req,res){
    var form = new formidable.IncomingForm();
    var file_name = 'upload';
    var Course = global.db.models.course;
    var Teacher = global.db.models.teacher;
    form.uploadDir = path.join(__dirname , '../../tmp');
    form.keepExtensions = true;
    form.type = true;
    form.parse(req, function(err, fields, files) {
    });
    form.on('end',function(){
            var rs = fs.createReadStream(form.uploadDir +'/'+ file_name);
            var parser = csvParser({columns: true}, function(err, data){
                //console.log(req.params.course_id);
                Course.findOne({where:{course_id:req.params.course_id}}).then(function(course){
                    //console.log(course);
                    for(index in data){
                        Teacher.findOne({where:{teacher_id:data[index]['teacher_id']}}).then(function(teacher){
                            if(teacher) {
                                course.addTeacher(teacher);
                                //console.log(course);
                            }
                        })
                    }
                }).then(function(){
                    var course_id = req.params.course_id;
                    request(host + '/data_provider/course/'+course_id,function (err,response,body) {
                        var course_json = JSON.parse(body)["data"];
                        request(host +'/data_provider/course/'+course_id+'/student',function(err,response,body){
                            var student_json = JSON.parse(body)["data"];
                            request(host +'/data_provider/course/'+course_id+'/teacher',function(err,response,body){
                                var teacher_json = JSON.parse(body)["data"];
                                res.render('course/profile',{course:course_json,teacher:teacher_json,student:student_json});
                            });
                        });
                    });
                });
            });
            rs.pipe(parser);
        })
        .on('file', function(field, file) {
            //rename the incoming file to the file's name
            fs.rename(file.path, form.uploadDir + "/" + file.name);
            file_name = file.name;
        });
};

