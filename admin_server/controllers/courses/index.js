/**
 * Created by wangzhaoyi on 16/7/8.
 */
var request = require('request');
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
    var course_json = [];
    var student_json = [];
    var teacher_json = [];
    request(host + '/data_provider/course/'+course_id,function (err,response,body) {
        course_json = JSON.parse(body)["data"];
        request(host +'/data_provider/course/'+course_id+'/teacher',function(err,response,body){
            student_json = JSON.parse(body)["data"];
            request(host +'/data_provider/course/'+course_id+'/teacher',function(err,response,body){
                teacher_json = JSON.parse(body)["data"];
            });
        });
        res.render('course/profile',{course:course_json,teacher:teacher_json,student:student_json});
    });
};

exports.import = function(req,res){
    var form = new formidable.IncomingForm();
    var file_name = 'upload';
    form.uploadDir = path.join(__dirname , '../../tmp');
    form.keepExtensions = true;
    form.type = true;
    form.parse(req, function(err, fields, files) {
    });
    form.on('end',function(){
            fs.readFile(form.uploadDir + "/" + file_name, {
                encoding: 'utf-8'
            }, function(err, csvData) {
                if (err) {
                    console.log(err);
                }
                csvParser(csvData, {delimiter: ','},
                    function(err, data) {
                        var Course = global.db.models.course;
                        for(row in data){
                            Course.create({
                                course_name:data[row][0],
                                introduction:data[row][1],
                                term:data[row][2],
                                lesson_total:data[row][3],
                                img_src:data[row][4]
                            });
                        }
                    });
            });
            //fs.unlinkSync(form.uploadDir + file_name);
            request(host+'/course/index',function(err,response){
                console.log(response);
                if (err){
                    console.log(err);
                }
            });
        })
        .on('file', function(field, file) {
            //rename the incoming file to the file's name
            fs.rename(file.path, form.uploadDir + "/" + file.name);
            file_name = file.name;
        });
};