/**
 * Created by wangzhaoyi on 16/7/7.
 */
var request = require('request');
var host = "http://127.0.0.1:3002";

exports.list = function(req,res,next){
    //TODO: show list of imported students.
    var Student = global.db.models.student;
    Student.findAll({}).then(function(student){
        if(student){
            res.json(ResultConstructor.success({
                student_id: student.student_id,
                name: student.name
            }));
        }
        else {
            next(new Errors.errors_404.GroupNotFoundError("未找到学生"));
        }
    }).catch(function (err) {
        next(err);
    });
    res.json({msg:"show list of imported students.", params:req.params});
};

exports.show = function(req,res,next){
    //TODO: show info of one student.
    var Student = global.db.models.student;
    var student_id = req.params.student_id;
    Student.find({where:{student_id:student_id}}).then(function (student) {
        if(student){
            res.json(ResultConstructor.success({
                student_id: student.student_id,
                name: student.name,
                telephone:student.telephone,
            }));
        }
        else {
            next(new Errors.errors_404.GroupNotFoundError("未找到课程信息"));
        }
    }).catch(function (err) {
        next(err);
    });
    res.json({msg:"show info of one student.", params:req.params});
};

exports.import = function(req,res){
    //TODO: import students.
    res.json({msg:"import students.", params:req.params, post_body:req.body});
};

exports.update = function(req,res){
    //TODO: update info for one student.
    res.json({msg:"update info for one student.", params:req.params, post_body:req.body});
};