module.exports = {
    index:function(req,res){
        var msg = '展示课程的所有团队';
        res.json({msg:msg,router:"course/team.index",params:req.params});
    },
    info:function(req,res){
        var msg = '查看团队的信息';
        res.json({msg:msg,router:"course/team.info",params:req.params});
    },
    reject:function(req,res){
        var msg = '拒绝/删除团队申请';
        res.json({msg:msg,router:"course/team.reject",params:req.params});
    }
};