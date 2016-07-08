module.exports = {
    index:function(req,res){
        var Assignment = global.db.models.assignment;
        var course_id  = req.params.course_id;
        Assignment.findAll({where:{course_id:course_id}}).then(function(assignments){
            res.render('course/assignments',{list:assignments,params:req.params});
        });
        //res.json({msg:'展示课程的所有作业',router:"course/assignment.index"});
    },
    all:function(req,res){
        var assignment_id = req.params.assignment_id;
        var Submit     = global.db.models.submit;
        var Assignment = global.db.models.assignment;
        Submit.findAll({where:{assignment_id:assignment_id}}).then(function(submits){
            Assignment.findOne({where:{assignment_id:assignment_id}}).then(function(assignment){
                var lesson = assignment['lesson_id']; // TODO 貌似要改数据库，这里好像也要改
                console.log(req.params);
                res.render('course/assignment',{list:submits,lesson:lesson,params:req.params});
                //res.render('/course/submits',{list:submits,params:req.params});
            });
        });
        //var msg = '展示课程作业的所有学生提交情况';
        //res.json({msg:msg,router:"course/assignment.all",params:req.params});
    },
    update:function(req,res){
        //var msg = '修改课程作业的相关信息';
        var Assignment = global.db.models.assignments;
        var assignment_id = req.params.assignment_id;
        Assignment.find({where: {assignment_id: assignment_id}}).then(function (assignment) {
            assignment_type= req.body.assignment_type;
            deadline= req.body.deadline;
            file_path= req.body.file_path;
            assignment_introduction= req.body.assignment_introduction;
            assignment.save().then(function (resultparam) {
                res.render('course/assignment.update',{list:resultparam,params:req.params});
            });
        });
        //res.json({msg:msg,router:"course/assignment.update",params:req.params,post_body:req.body});
    },
    info:function(req,res){
        var msg = '查看单个学生作业的情况';
        res.json({msg:msg,router:"course/assignment.info",params:req.params});
    },
    mark:function(req,res){
        var msg = '给学生作业评分';
        res.json({msg:msg,router:"course/assignment.mark",params:req.params,post_body:req.body});
    },
    download:function(req,res){
        var msg = '下载学生作业';
        res.json({msg:msg,router:"course/assignment.download",params:req.params});
    },
    upload:function(req,res){
        //var msg = '上传学生作业';
        var Assignment = global.db.models.assignment;
        var assignmentparam = {
            assignment_type: req.body.assignment_type,
            course_id: req.params.course_id,
            lesson: req.body.lesson,
            deadline: req.body.deadline,
            file_path: req.body.file_path,
            upload_time: new Date().getTime(),
            assignment_introduction: req.body.assignment_introduction
        };
        console.log(assignmentparam);
        Assignment.create(assignmentparam).then(function (assignment) {
            assignment.save();
            res.json({msg:"success"});
        });

        //res.json({msg:msg,router:"course/assignment.upload",params:req.params});
    }
};