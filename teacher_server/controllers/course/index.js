/**
 * Created by zhangxinru on 16/7/7.
 */
module.exports = {
    index: function(req,res){
        var Course = global.db.models.course;
        Course.findAll().then(function (courses) {
            res.render('index', {list: courses, params:req.params});
        });
    },
    info:function(req,res){
        var course_id = req.params.course_id;
        var Course = global.db.models.course;
        Course.findOne({where:{course_id:course_id}}).then(function(course){
            res.render('course/index',{course_name:"数学",introduction:"呵呵"});
        });
        //res.json({msg:msg,router:"course.info",params:req.params});
    }
};