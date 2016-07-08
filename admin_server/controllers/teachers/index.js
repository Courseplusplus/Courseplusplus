/**
 * Created by wangzhaoyi on 16/7/7.
 */
var request = require('request');
var host = "http://127.0.0.1:3002";

exports.list = function(req,res){
    //TODO: show list of imported teachers.
    res.json({msg:"show list of imported teachers.", params:req.params});
};

exports.show = function(req,res){
    //TODO: show info of one teacher.
    res.json({msg:"show info of one teacher.", params:req.params});
};

exports.import = function(req,res){
    //TODO: import teachers.
    res.json({msg:"import teachers.", params:req.params, post_body:req.body});
};

exports.update = function(req,res){
    //TODO: update info for one teacher.
    res.json({msg:"update info for one teacher.", params:req.params, post_body:req.body});
};