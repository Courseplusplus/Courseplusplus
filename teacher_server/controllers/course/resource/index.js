module.exports = {
    index:function(req,res){
        var Resource   = global.db.models.resource;
        var course_id  = req.params.course_id;
        Resource.findAll({where:{course_id:course_id}}).then(function(resources){
            res.render('course/resources',{list:resources,params:req.params});
        });
        //var msg = '展示课程的所有资源';
        //res.json({msg:msg,router:"course/resource.index",params:req.params});
    },
    resource:function(req,res){
        var msg = '查看课程单个资源';
        res.json({msg:msg,router:"course/resource.resource",params:req.params});
    },
    download:function(req,res){
        var msg = '下载课程单个资源';
        var course_id   = req.params.course_id;
        var resource_id = req.params.resource_id;
        var Resource   = global.db.models.resource;
        Resource.findOne({where:{resource_id:resource_id}}).then(function(resource){
            res.download(resource.file_path);
            //res.json({msg:msg,router:"course/resource.download",params:req.params});
        });
    },
    upload:function(req,res){
        var formidable = require("formidable");
        var form = new formidable.IncomingForm(),
            files = [],
            fields = [];

        form.uploadDir = "../../../../resource/tmp/";

        form
            .on('field', function(field, value) {
                console.log(field, value);
                fields.push([field, value]);
            })
            .on('file', function(field, file) {
                console.log(field, file);
                files.push([field, file]);
                fs.rename(file.path,"../../../../resource/"+file.name);
            });
        var msg='上传课程资源';
        //res.json({msg:msg,router:"course/resource.upload",params:req.params,post_body:req.body});
    }
};