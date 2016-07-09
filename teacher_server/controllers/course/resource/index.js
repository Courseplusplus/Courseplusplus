module.exports = {
    index:function(req,res){
        var Resource   = global.db.models.resource;
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
        var course_id   = req.params.course_id;
        var resource_id = req.params.resource_id;
        var Resource   = global.db.models.resource;
        Resource.findOne({where:{resource_id:resource_id}}).then(function(resource){
            res.download(resource.file_path);
            //res.json({msg:msg,router:"course/resource.download",params:req.params});
        });
    },
    upload:function(req,res){
        var fs        = require('fs');
        var path      = require('path');
        var filename  = req.files.upload.name;
        var oldPath   = req.files.upload.path;
        var course_id = req.params.course_id;
        var targetPath = path.join(__dirname, '../../../../resources/resources/' + course_id , filename);
        var dir        = path.join(__dirname, '../../../../resources/resources/' + course_id);
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.createReadStream(oldPath).pipe(fs.createWriteStream(targetPath));
        var Resource=  global.db.models.resource;
        Resource.build({
            resource_type:req.body.resource_type,
            lesson:req.body.lesson,
            resource_name:filename,
            file_path:targetPath,
            created_at:new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updated_at:new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            course_id:req.params.course_id
        }).save().then(function(){
            res.json({msg:'添加成功'});
        });
    }
};