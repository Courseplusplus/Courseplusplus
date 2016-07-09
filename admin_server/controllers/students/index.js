/**
 * Created by wangzhaoyi on 16/7/7.
 */
var request = require('request');
var host = "http://127.0.0.1:3002";

exports.list = function(req,res,next){
    var Student = global.db.models.student;
    var student_list = [];
    Student.findAll({}).then(function(students){
        for(index in students){
            student_list.push({student_id:students[index].student_id,name:students[index].name});
        }
        res.render('student/index',{list:student_list});
    }).catch(function (err) {
        next(err);
    });
    //res.json({msg:"show list of imported students.", params:req.params});
};

exports.show = function(req,res,next){
    var Student = global.db.models.student;
    var student_id = req.params.student_id;
    Student.findOne({where:{student_id:student_id}}).then(function (student) {
        if(student){
            var student_json =
            {
                student_id:student.student_id,
                student_name: student.student_name,
                telephone:student.telephone
            };
            res.render('student/profile',{student:student_json,list:course_json});
        }
        else {
            next(new Errors.errors_404.GroupNotFoundError("未找到学生信息"));
        }
    }).catch(function (err) {
        next(err);
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
                            Student.create({
                                student_id:data[row][0],
                                name:data[row][1],
                                telephone:data[row][2],
                                password:'000000'
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
