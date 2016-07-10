var fs        = require('fs');
var path      = require('path');
var archiver  = require('archiver');

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
    },
    all:function(req,res){
        var request = require('request');
        var path    = require('path');
        var url     = "http://localhost:3001/api/course/"+req.params.course_id+"/assignment/"+req.params.assignment_id+"/submit";
        request(url,function(err,response,body){
            if (!err && response.statusCode == 200) {
                var data = JSON.parse(body)["data"];
                var file_name = path.basename(data['assignment']['file_path']);
                var order   = req.query.order?req.query.order:data['assignment']['lesson'];
                res.render('course/assignment',{data:data,order:order,file_name:file_name,params:req.params});
            }
        });
    },
    update:function(req,res){
        var course_id = req.params.course_id;
        var fs        = require('fs');
        var path      = require('path');
        var file_size = req.files.attachment.size;

        if( file_size > 0 ){
            var filename  = req.files.attachment.name;
            var oldPath   = req.files.attachment.path;
            var targetPath = path.join(__dirname, '../../../../resources/assignments/intro/' + course_id , filename);
            var dir        = path.join(__dirname, '../../../../resources/assignments/intro/' + course_id);
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            fs.createReadStream(oldPath).pipe(fs.createWriteStream(targetPath));
        }else{
            targetPath = "";
        }
        var Assignment =  global.db.models.assignment;

        Assignment.findOne({where:{assignment_id:req.params.assignment_id}}).then(function(assignment){
            var update_field = []
            if(req.body.hasOwnProperty('assignment_type') && req.body.assignment_type!=""){
                assignment['assignment_type'] = req.body.assignment_type;
                update_field.push("assignment_type");
            }
            if(req.body.deadline!="") {
                assignment['deadline'] = req.body.deadline;
                update_field.push('deadline');
            }
            if(req.body.assignment_intro!=""){
                assignment['assignment_intro'] = req.body.assignment_intro;
                update_field.push('assignment_intro');
            }
            if(targetPath!="") {
                assignment['file_path'] = targetPath;
                update_field.push('file_path');
            }
            console.log(update_field);
            assignment.save({fields:update_field}).then(function(){
                var msg = '修改成功!';
                res.json({msg:msg,router:"course/assignment.all",params:req.params,post_body:req.body});
            });
        });

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
    download_all:function(req,res){
        var archive       = archiver('zip');
        var course_id     = req.params.course_id;
        var assignment_id = req.params.assignment_id;
        var team_id       = req.params.team_id;
        var submit_path   = path.join(__dirname,"../../../../resources/assignments/submits/"+course_id+"/"+assignment_id);
        if(fs.existsSync(submit_path)){
            var file_name = "Assignment.zip";
            res.attachment(file_name);
            archive.directory(submit_path,'/Assignment');
            archive.pipe(res);
            archive.finalize();
        }else{
            var msg = '批量下载学生作业';
            console.log(submit_path);
            res.json({msg:msg,router:"course/assignment.download",params:req.params});
        }
    },
    download:function(req,res){
        var archive       = archiver('zip');
        var course_id     = req.params.course_id;
        var assignment_id = req.params.assignment_id;
        var team_id       = req.params.team_id;
        var submit_path   = path.join(__dirname,"../../../../resources/assignments/submits/"+course_id+"/"+assignment_id+"/"+team_id);
        if(fs.existsSync(submit_path)){
            var file_name = 'Team'+team_id+".zip";
            res.attachment(file_name);
            archive.directory(submit_path,'/Team'+team_id);
            archive.pipe(res);
            archive.finalize();
        }else{
            var msg = '下载学生作业';
            console.log(submit_path);
            res.json({msg:msg,router:"course/assignment.download",params:req.params});
        }
    },
    download_intro:function(req,res){
        var msg = "下载附加说明";
        res.json({msg:msg});
    },
    upload:function(req,res){
        var course_id     = req.params.course_id;
        var file_size     = req.files.attachment.size;

        if( file_size > 0 ){
            var filename  = req.files.attachment.name;
            var oldPath   = req.files.attachment.path;
            var targetPath = path.join(__dirname, '../../../../resources/assignments/intro/' + course_id, filename);
            var dir        = path.join(__dirname, '../../../../resources/assignments/intro/' + course_id);
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            fs.createReadStream(oldPath).pipe(fs.createWriteStream(targetPath));

        }else{
            filename   = "";
            targetPath = "";
        }

        var Assignment =  global.db.models.assignment;
        Assignment.build({
            assignment_type : req.body.assignment_type,
            lesson          : req.body.lesson,
            upload_time     : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            deadline        : req.body.deadline,
            file_path       : targetPath,
            assignment_introduction:req.body.assignment_intro,
            created_at      : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updated_at      : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            course_id       : course_id
        }).save().then(function(){
            res.json({msg:"success!"});
        });
    }
};