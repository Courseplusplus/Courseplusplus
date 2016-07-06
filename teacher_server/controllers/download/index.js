/**
 * Created by zhangxinru on 16/7/4.
 */
var path = require('path');
var config = require('../../config.json');
var db = require('../../models')(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    config.mysql.config
);

var Submit = db.models.submit;

var tool = require('./libs/tool');

var download = {
    list:function(req,res){
        var assignment_id = req.params.assignment_id;
        tool.getList(res,assignment_id);
        //res.json({msg: "hellos"});
    },
    download: function(req, res){
        var submit_id = req.params.submit_id;
        //console.log('here');
        tool.download(res, submit_id);
    },
    batch_download: function(req,res){
        tool.batch_download(req,res);
    },
    single_download: function(req,res){
        tool.single_download(req,res);
    }
};

module.exports = download;