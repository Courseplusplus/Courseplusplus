/**
 * Created by wangzhaoyi on 16/7/5.
 */
var formidable = require('formidable');
var util = require('util');
var fs   = require('fs-extra');
exports.upload = function (req,res,next) {
    var Resource = global.db.models.resource;
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/Resource_File';
    form.keepExtensions = true;
    form.type = true;
    var file_name;
    form.parse(req, function(err, fields, files) {
        //res.writeHead(200, {'content-type': 'text/plain'});
        //res.write('Upload received :\n');
        res.end(util.inspect({fields: fields, files: files}));
    });
    form.on('end',function(){
            Resource.create({
                resource_type:"PPT",
                course_id:"1",
                lesson:"1",
                resource_name:file_name,
                file_path:form.uploadDir + "/" + file_name})
        })
        .on('file', function(field, file) {
            //rename the incoming file to the file's name
            fs.rename(file.path, form.uploadDir + "/" + file.name);
            file_name = file.name;
        });
    //res.writeHead(200, {'content-type': 'text/html'});
    //res.end(
        /*'<form action="/upload" method="post" enctype="multipart/form-data">'+
        'type: <select name = "resourse_type"><option value = "PPT">PPT</option><option value = "VIDEO">VIDEO</option><option value = "OTHER">OTHER</option></select><br>'+
        'lesson: <input type="text" name="lesson" size="10" maxlength="20"><br> '+
        '<input type="file" name="upload" multiple="multiple"><br>'+
        '<input type="submit" value="Upload">'+
        '</form>'*/
    //);
    //res.render('course')
};

