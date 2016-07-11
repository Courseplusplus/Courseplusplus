/**
 * Created by zhangxinru on 16/7/7.
 */
module.exports = {
    index: function(req,res){
        var Course = global.db.models.course;
        var Teacher_belongsto_course = global.db.models.teacher_belongsto_course;
        var teacher_id = req.session.user.teacher_id;
        Teacher_belongsto_course.findAll({where:{teacher_id:teacher_id}}).then(function(ids){
            Course.findAll().then(function (courses) {
                console.log(ids);
                //res.json({id:ids});
                res.render('index', {list: courses, params:req.params,session:req.session});
            });
        });
    },
    info:function(req,res){
        var course_id = req.params.course_id;
        var Course = global.db.models.course;
        Course.findOne({where:{course_id:course_id}}).then(function(course){
            res.render('course/index',{data:course,params:req.params,session:req.session});
        });
        //res.json({msg:msg,router:"course.info",params:req.params});
    }
};