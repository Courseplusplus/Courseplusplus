/**
 * Created by wangzhaoyi on 16/7/5.
 */
var formidable = require('formidable');
var util = require('util');
var fs   = require('fs-extra');
var path = require('path');

exports.upload = function (req,res,next) {
    var Resource = global.db.models.resource;
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname , '../../../../resources/');
    form.keepExtensions = true;
    form.type = true;
    var file_name;
    form.parse(req, function(err, fields, files) {
    });
    form.on('end',function(){

            Resource.create({
                resource_type:"PPT",
                course_id:"1",
                lesson:"1",
                resource_name:file_name,
                file_path:form.uploadDir + "/" + file_name});
        })
        .on('file', function(field, file) {
            //rename the incoming file to the file's name
            fs.rename(file.path, form.uploadDir + "/" + file.name);
            file_name = file.name;
        });
    //res.json({msg:"sucess"});
    //res.render('course/1/resources');
    res.writeHead(302,{
        'Location':'/course/1/resources'
    });
    console.log("success");
};

