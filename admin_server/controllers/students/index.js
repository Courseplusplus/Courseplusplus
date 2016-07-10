/**
 * Created by wangzhaoyi on 16/7/7.
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
    request(host + '/data_provider/student',function(err,response,body){
        res.render('student/index',{list:JSON.parse(body)['data']});
    });
    //res.json({msg:"show list of imported students.", params:req.params});
};

exports.show = function(req,res,next){
    request(host+'/data_provider/student/'+req.params.student_id,function(err,response,body){
        var student_json = JSON.parse(body)['data'];
        request(host+'/data_provider/student/'+req.params.student_id+'/course',function(err,response,body){
            var course_json = JSON.parse(body)['data'];
            console.log(course_json);
            console.log(student_json);
            res.render('student/profile',{student:student_json,list:course_json});
            //res.json({student:student_json,list:course_json});
        });
    });
    //res.json({msg:"show info of one student.", params:req.params});
};

exports.import = function(req,res){
    var form = new formidable.IncomingForm();
    var file_name = 'student.csv';
    form.uploadDir = path.join(__dirname , '../../tmp');
    form.keepExtensions = true;
    form.type = true;
    form.parse(req, function(err, fields, files) {
    });
    form.on('end',function(){
            var rs = fs.createReadStream(form.uploadDir +'/student.csv');
            var parser = csvParser({columns: true}, function(err, data){
                //console.log(data);
                //console.log(data);
                var Student = global.db.models.student;
                Student.bulkCreate(data).then(function(){
                    request(host + '/data_provider/student',function(err,response,body){
                        res.render('student/index',{list:JSON.parse(body)['data']});
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