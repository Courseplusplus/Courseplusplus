module.exports = {
    index:function(req,res){
        var msg = '展示课程的所有团队';
        var request = require('request');
        var url     = "http://localhost:3001/api/course/"+req.params.course_id+"/team/";
        request(url,function(err,response,body){
            if (!err && response.statusCode == 200) {
                var data = JSON.parse(body)["data"];
                res.render('course/teams',{data:data,params:req.params,session:req.session});
            }else{
                res.json({msg:msg});
            }
        });

        //res.json({msg:msg,router:"course/team.index",params:req.params});
    },
    info:function(req,res){
        var team_id = req.params.team_id;
        var Team    = global.db.models.team;
        var Course  = global.db.models.course;
        var Student  = global.db.models.student;
        var Student_team = global.db.models.student_belongsto_team;
        Team.findOne({where:{team_id:team_id}}).then(function(team){
            var course_id  = team['course_id'];
            var student_id = team['student_id'];
            Course.findOne({where:{course_id:course_id}}).then(function(course){
                Student.findOne({where:{student_id:student_id}}).then(function(leader){
                    console.log(team);
                    Student_team.findAll({where : {team_id : team_id}}).then(function(student_relations){
                        var studentlist = [];
                        var cnt = 0, len = 0;
                        for (var index in student_relations){
                            if (student_relations[index].accepted == "Accepted") len ++;
                        }
                        console.log('len = ' + len);
                        for (var index in student_relations){
                            var student_id = student_relations[index].student_id;
                            if (student_relations[index].accepted != "Accepted") continue;
                            Student.findOne({where : {student_id : student_id}}).then(function(student){
                                studentlist.push(student);
                                cnt ++;
                                if (cnt == len) {
                                    console.log('zhe ge guo backend bu bei');
                                    res.render('course/team', {
                                                team        : team,
                                                course      : course,
                                                params      : req.params,
                                                session     : req.session,
                                                leader      : leader,
                                                studentlist : studentlist
                                    });
                                }
                            });
                        }

                    });
                    var msg = '查看团队的信息';
                });
            });
        });
    },
    operate:function(req,res){
        console.log(req.body);
        var Team = global.db.models.team;
        Team.findOne({where:{team_id:req.params.team_id}}).then(function(team){
            var update_fields = [];
            if(req.body.hasOwnProperty('type')){
                if(req.body.type == 'accept'){
                    team['permission'] = 'Permited';
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