/**
 * Created by wangzhaoyi on 16/7/7.
 */
var request = require('request');
var host = "http://127.0.0.1:3002";

exports.list = function(req,res){
    var Teacher = global.db.models.teacher;
    var teacher_list = [];
    Teacher.findAll({}).then(function(teachers){
        for(index in teachers){
            teacher_list.push({teacher_id:teachers[index].teacher_id,name:teachers[index].name});
        }
        res.render('teacher/index',{list:teacher_list});
    }).catch(function (err) {
        next(err);
    });
    //res.json({msg:"show list of imported teachers.", params:req.params});
};

exports.show = function(req,res){
    var Teacher = global.db.models.teacher;
    var teacher_id = req.params.teahcer_id;
    Teacher.findOne({where:{teacher_id:teacher_id}}).then(function (teacher) {
        if(teacher){
            var teacher_json =
            {
                teacher_id: teacher.teahcer_id,
                name: teacher.name,
                telephone: teacher.telephone
            };
            res.render('teacher/profile',{teacher:teacher_json,list:course_json});
        }
        else {
            next(new Errors.errors_404.GroupNotFoundError("未找到教师信息"));
        }
    }).catch(function (err) {
        next(err);
    });
    //res.json({msg:"show info of one teacher.", params:req.params});
};

exports.import = function(req,res){
    var form = new formidable.IncomingForm();
    var file_name = 'teachers';
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
                        for(row in data){
                            Teacher.create({
                                teacher_id:data[row][0],
                                name:data[row][1],
                                telephone:data[row][2],
                                password:'000000'
                            });
                        }
                    });
            });
            request(host+'/teacher/index',function(err,response){
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
