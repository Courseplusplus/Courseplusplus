/**
 * Created by zhangxinru on 16/7/4.
 */
var path = require('path');
var adm_zip = require('adm-zip');
var fs = require('fs');
var zip = new adm_zip();
var EasyZip = require('easy-zip').EasyZip;
var easy_zip = new EasyZip();
var data = require('../../data');
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
            var data = {team_id:submits[index].team_id,download_url:'http://localhost:3001/download/' + submits[index].submit_id};
            pathlist.push(data);
        }
        console.log(pathlist);
        res.json({msg:'success',data:pathlist});
    });
};


var download = function(res, submit_id){
    Submit.findOne({where:{submit_id: submit_id}}).then(function(submit){
        var filepath = submit['file_path'];
        filepath = path.join(__dirname, '../../../../' + filepath);
        filepath = path.dirname(filepath);
        console.log(filepath);
        try{
            zip.addLocalFolder(filepath);
        }catch(err){
            console.log(err);
        }
        var zip_path = path.join(__dirname, '../../../../resources/download.zip');
        fs.exists(zip_path,function(exist){
            if(exist) {
                fs.unlinkSync(zip_path);
            }
        });
        zip.writeZip(zip_path);
        res.download(zip_path);
    });
};

var getRootPath = function(){

};
var single_download = function(req, res){
    var resource_id = req.params.resource_id;
    data.resource(resource_id).then(function(resource){
        var filepath = resource['file_path'];
        filepath = path.dirname(filepath);
        var zip_path = 'download.zip';
        //zip.addLocalFolder(filepath);
        fs.exists(zip_path,function(exist){
            if(exist){
                fs.unlinkSync(zip_path);
                //zip_path = path.join(__dirname, '../../../../resources/download_new.zip');
            }
            console.log(filepath);
            easy_zip.zipFolder(filepath,function(){
                easy_zip.writeToFileSycn(zip_path);
                console.log(path.join(__dirname,"../../../../"+zip_path));
                res.download(path.join(__dirname,"../../../../"+zip_path),'download.zip');
            });
        });
    });
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
    single_download:single_download,
    batch_download:batch_download
};