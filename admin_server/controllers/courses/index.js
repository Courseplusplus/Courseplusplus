/**
 * Created by zhangxinru on 16/7/5.
 */
var request = require('request');
var host = "http://127.0.0.1:3002";

exports.list = function(req,res,next){
    //TODO: show list of imported courses.
    var Course = global.db.models.course;
    var course_list = []
    Course.findAll({}).then(function(courses){
        for(index in courses){
            course_list.push({course_id:courses[index].course_id,course_name:courses[index].course_name});
        }
        res.render('course/index',{list:course_list});
    }).catch(function (err) {
        next(err);
    });
    //res.json({msg:"show list of imported courses.", params:req.params});
};

exports.show = function(req,res,next){
    //TODO: show info of one course.
    var Course = global.db.models.course;
    var course_id = req.params.course_id;
    Course.findOne({where:{course_id:course_id}}).then(function (course) {
        if(course){
            var course_json =
            {
                course_id: course.course_id,
                course_name: course.course_name,
                introduction: course.introduction,
                term:course.term,
                lesson_total:course.lesson_total,
                img_src: course.img_src
            };
            res.render('course/profile',{course:course_json});
        }
        else {
            next(new Errors.errors_404.GroupNotFoundError("未找到课程信息"));
        }
    }).catch(function (err) {
        next(err);
    });
    //res.json({msg:"show info of one course.", params:req.params});
};

exports.import = function(req,res){
    //TODO: import courses.
    res.json({msg:"import courses.", params:req.params, post_body:req.body});
};

exports.update = function(req,res,next){
    //TODO: update info for one course
    var Course = global.db.models.course;
    var course_id = req.params.course_id;
    Course.find({where: {course_id: course_id}}).then(function (course) {
        if(course) {
            var updateParams = {
                course_id: req.body.course_id,
                course_name: req.body.course_name,
                introduction: req.body.introduction,
                term: req.body.term,
                lesson_total: req.body.lesson_total,
                img_src: req.body.lesson_total
            };
            for (var key in updatedParams) {
                if (updateParams[key]) {
                    Course[key] = updateParams[key];
                }
            }
            return Course.save();
        }
        else {
            next(new Errors.errors_404.UserNotFoundError("未找到课程"));
        }
    }).then(function(refreshed_cource){
        res.json(ResultConstructor.success({
            cource_id:Cource.cource_id,
            cource_name:Cource.cource_name,
            introduction:Cource.introduction,
            term:Cource.term,
            lesson_total:Cource.lesson_total,
            img_src:Cource.img_src
        }));
    });
    res.json({msg:"update info for one course", params:req.params, post_body:req.body});
};