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
            res.render('student/profile',{student:student_json});
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
    //TODO: import students.
    res.json({msg:"import students.", params:req.params, post_body:req.body});
};

exports.update = function(req,res){
    //TODO: update info for one student.
    res.json({msg:"update info for one student.", params:req.params, post_body:req.body});
};