module.exports = {
    index:function(req,res){
        var Assignment = global.db.models.assignment;
        var Course     = global.db.models.course;
        var course_id  = req.params.course_id;
        Assignment.findAll({where:{course_id:course_id}}).then(function(assignments){
            Course.findOne({where:{course_id:course_id}}).then(function(course){
                res.render('course/assignments',{list:assignments,params:req.params,course:course});
            });
        });
        //res.json({msg:'展示课程的所有作业',router:"course/assignment.index"});
    },
    all:function(req,res){
        var assignment_id = req.params.assignment_id;
        var Submit     = global.db.models.submit;
        var Assignment = global.db.models.assignment;
        Submit.findAll({where:{assignment_id:assignment_id}}).then(function(submits){
            Assignment.findOne({where:{assignment_id:assignment_id}}).then(function(assignment){
                var lesson = assignment['lesson'];
                res.render('course/assignment',{list:submits,lesson:lesson,params:req.params});
                //res.render('/course/submits',{list:submits,params:req.params});
            });
        });
    },
    update:function(req,res){
        var msg = '修改课程作业的相关信息';
        res.json({msg:msg,router:"course/assignment.all",params:req.params,post_body:req.body});
    },
    info:function(req,res){
        var msg = '查看单个学生作业的情况';
        res.json({msg:msg,router:"course/assignment.info",params:req.params});
    },
    mark:function(req,res){
        var msg = '给学生作业评分';
        console.log(req.body);
        var submit_id = req.body["submit_id"];
        var score     = req.body["score"];
        var comment   = req.body["comment"];
        var Submit    = global.db.models.submit;
        Submit.findOne({where:{submit_id:submit_id}}).then(function(submit){
            submit["grade"] = score;
            submit["comment"] = comment;
            submit["updated_at"] = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            submit.save({fields:['grade','comment','updated_at']}).then(function(){
                res.json({msg:'评分成功！'});
            });
        });

        //res.json({msg:msg,router:"course/assignment.makr",params:req.params,post_body:req.body});
    },
    download:function(req,res){
        var msg = '下载学生作业';
        res.json({msg:msg,router:"course/assignment.download",params:req.params});
    },
    upload:function(req,res){
        var msg = '上传学生作业';
        res.json({msg:msg,router:"course/assignment.upload",params:req.params});
    }
};