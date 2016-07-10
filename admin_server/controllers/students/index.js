/**
 * Created by wangzhaoyi on 16/7/7.
 */
var request = require('request');
var PasswordValidator = require('../../libs').PasswordValidator;
var ResultConstructor = require('../../libs').ResultConstructor;
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
    var file_name = 'student';
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
                        var Student = global.db.models.teacher;
                        for(row in data){
                            var userParams = {
                                student_id:data[row][0],
                                name:data[row][1],
                                telephone:data[row][2],
                                password: PasswordValidator.encrypt_password('000000')
                            };
                            Student.create(userParams).then(function (user) {
                                if (user) {
                                    res.json(ResultConstructor.success({
                                        teacher_id: user.user_id,
                                        name: user.name,
                                        telephone: user.telephone
                                    }));
                                }
                                else {
                                    next(new Errors.errors_500.InternalServerError());
                                }
                            }).catch(function () {
                                next(new Errors.errors_400.DataValidationFailedError());
                            });
                        }
                    });
            });
            request(host+'/student/index',function(err,response){
                console.log(response);
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