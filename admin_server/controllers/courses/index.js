/**
 * Created by zhangxinru on 16/7/5.
 */
var request = require('request');
var host = "http://127.0.0.1:3002";

exports.list = function(req,res){
    //TODO: show list of imported courses.
    res.json({msg:"show list of imported courses.", params:req.params});
};

exports.show = function(req,res){
    //TODO: show info of one course.
    res.json({msg:"show info of one course.", params:req.params});
};

exports.import = function(req,res){
    //TODO: import courses.
    res.json({msg:"import courses.", params:req.params, post_body:req.body});
};

exports.update = function(req,res){
    //TODO: update info for one course
    res.json({msg:"update info for one course", params:req.params, post_body:req.body});
};