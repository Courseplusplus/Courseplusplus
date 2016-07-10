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

exports.list = function(req,res){
    request(host + '/data_provider/teacher',function(err,response,body){
        res.render('teacher/index',{list:JSON.parse(body)['data']});
    });
    //res.json({msg:"show list of imported teachers.", params:req.params});
};

exports.show = function(req,res){
    request(host + '/data_provider/teacher/'+req.params.teacher_id,function(err,response,body){
        var teacher_json = JSON.parse(body)['data'];
        request(host+'/data_provider/teacher/'+req.params.teacher_id+'/course',function(err,response,body){
            console.log(JSON.parse(body)['data']);
            res.render('teacher/profile',{teacher:teacher_json,list:JSON.parse(body)['data']});
        });
    });
    //res.json({msg:"show info of one teacher.", params:req.params});
};

exports.import = function(req,res){
    var form = new formidable.IncomingForm();
    var file_name = 'teachers.csv';
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
                        var Teacher = global.db.models.teacher;
                        //console.log(data);
                        for(row in data){
                            if(row!=0) {
                                //console.log(row);
                                var userParams = {
                                    teacher_id: data[row][0],
                                    name: data[row][1],
                                    telephone: data[row][2],
                                    password: PasswordValidator.encrypt_password('000000')
                                };
                                //console.log(userParams);
                                Teacher.create(userParams);
                            }
                        }
                    });
            });
            request(host+'/teacher',function(err,response){
                //console.log(response);
                if (err){
                    console.log(err);
                }
            });
        })
        .on('file', function(field, file) {
            //rename the incoming file to the file's name
            fs.rename(file.path, form.uploadDir + "/" + file_name);
        });
};
