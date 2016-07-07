module.exports = {
    index:function(req,res){
        res.json({msg:'展示课程的所有作业',router:"course/assignment.index"});
    },
    all:function(req,res){
        var msg = '展示课程作业的所有学生提交情况';
        res.json({msg:msg,router:"course/assignment.all",params:req.params});
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
        res.json({msg:msg,router:"course/assignment.makr",params:req.params,post_body:req.body});
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