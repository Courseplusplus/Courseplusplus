/**
 * Created by wangzhaoyi on 16/7/7.
 */
var request = require('request');
var host = "http://127.0.0.1:3002";

exports.list = function(req,res){
    //TODO: show list of imported students.
    res.json({msg:"show list of imported students."});
};

exports.show = function(req,res){
    //TODO: show info of one student.
    res.json({msg:"show info of one student."});
};

exports.import = function(req,res){
    //TODO: import students.
    res.json({msg:"import students."});
};

exports.update = function(req,res){
    //TODO: update info for one student.
    res.json({msg:"update info for one student."});
};