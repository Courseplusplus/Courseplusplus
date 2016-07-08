/**
 * Created by wangzhaoyi on 16/7/7.
 */
var request = require('request');
var host = "http://127.0.0.1:3002";

exports.list = function(req,res){
    var Teacher = global.db.models.teacher;
    var teacher_list = []
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
    //TODO: show info of one teacher.
    var Teacher = global.db.models.teacher;
    var teacher_id = req.params.teahcer_id;
    Teacher.findOne({where:{teacher_id:teacher_id}}).then(function (teacher) {
        if(teacher){
            var teacher_json =
            {
                teacher_id: teacher.teahcer_id,
                name: teacher.name,
                telephone: teacher.telephone,
            };
            res.render('teacher/profile',{teacher:teacher_json});
        }
        else {
            next(new Errors.errors_404.GroupNotFoundError("未找到信息"));
        }
    }).catch(function (err) {
        next(err);
    });
    //res.json({msg:"show info of one teacher.", params:req.params});
};

exports.import = function(req,res){
    //TODO: import teachers.
    res.json({msg:"import teachers.", params:req.params, post_body:req.body});
};

exports.update = function(req,res){
    //TODO: update info for one teacher.
    res.json({msg:"update info for one teacher.", params:req.params, post_body:req.body});
};