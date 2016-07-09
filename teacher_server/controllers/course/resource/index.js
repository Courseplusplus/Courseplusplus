module.exports = {
    index:function(req,res){
        var Resource   = global.db.models.assignment;
        var course_id  = req.params.course_id;
        Resource.findAll({where:{course_id:course_id}}).then(function(resources){
            res.render('course/resources',{list:resources,params:req.params});
        });
        //var msg = '展示课程的所有资源';
        //res.json({msg:msg,router:"course/resource.index.js",params:req.params});
    },
    resource:function(req,res){
        var msg = '查看课程单个资源';
        res.json({msg:msg,router:"course/resource.resource",params:req.params});
    },
    download:function(req,res){
        var msg = '下载课程单个资源';
        res.json({msg:msg,router:"course/resource.download",params:req.params});
    },
    upload:function(req,res){
        var msg = '给课程上传资源';
        res.json({msg:msg,router:"course/resource.upload",params:req.params,post_body:req.body});
    }
};