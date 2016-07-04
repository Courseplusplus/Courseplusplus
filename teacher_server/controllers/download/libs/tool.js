/**
 * Created by zhangxinru on 16/7/4.
 */
var path = require('path');
var adm_zip = require('adm-zip');
var fs = require('fs');
var zip = new adm_zip();

var config = require('../../../config.json');
var db = require('../../../models')(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    config.mysql.config
);
var Submit = db.models.submit;
var getList = function(res,assignment_id){
    Submit.findAll({assignment_id:assignment_id}).then(function(submits){
        //console.log(submits);
        var pathlist = [];
        for(var index in submits){
            pathlist.push(submits[index].file_path);
        }
        res.sendfile(path.join(__dirname, '../../../views/test.html'));
        //res.json({msg:'success',data:pathlist});
    });
};


var download = function(res, submit_id){
    Submit.findOne({submit_id: submit_id}).then(function(submit){
        var filepath = submit.file_path;
        console.log(filepath);
        res.download(filepath);
    });
};

var getRootPath = function(){

};
var batch_download = function(req,res){
    var filepaths = req.body.data;
    for(var index in filepaths){
        try{
            zip.addLocalFolder(filepaths[index]);
        }catch(err){
            console.log(err);
        }
    }
    var zip_path = path.join(__dirname, '../../../../resources/download.zip');
    fs.exists(zip_path,function(exist){
        if(exist){
            fs.unlink(zip_path);
            //zip_path = path.join(__dirname, '../../../../resources/download_new.zip');
        }
        console.log(zip_path);
        zip.writeZip(zip_path);
        res.download(zip_path);
    });
};
module.exports = {
    getList:getList,
    download:download,
    batch_download:batch_download
};