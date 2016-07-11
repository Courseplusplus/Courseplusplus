module.exports = {
    index:function(req,res){
        var msg = '展示课程的所有团队';
        var request = require('request');
        var url     = "http://localhost:3001/api/course/"+req.params.course_id+"/team/";
        request(url,function(err,response,body){
            if (!err && response.statusCode == 200) {
                var data = JSON.parse(body)["data"];
                res.render('course/teams',{data:data,params:req.params});
            }
        });

        //res.json({msg:msg,router:"course/team.index",params:req.params});
    },
    info:function(req,res){
        var msg = '查看团队的信息';
        res.json({msg:msg,router:"course/team.info",params:req.params});
    },
    operate:function(req,res){
        console.log(req.body);
        var Team = global.db.models.team;
        Team.findOne({where:{team_id:req.params.team_id}}).then(function(team){
            var update_fields = [];
            if(req.body.hasOwnProperty('type')){
                if(req.body.type == 'accept'){
                    team['permission'] = 'Permitted';
                }else if(req.body.type == 'reject'){
                    team['permission'] = 'Denied';
                }
                update_fields.push('permission');
            }
            team.save({fields:update_fields}).then(function(){
                res.json({msg:"处理成功"});
            })
        });
    }
};