/**
 * Created by wangzhaoyi on 16/7/4.
 */
var PasswordValidator = require('../../../libs').PasswordValidator;
var ResultConstructor = require('../../../libs').ResultConstructor;
var Errors = require('../../../libs').Errors;
var request = require('request');

exports.index = function(req,res){
    var course_id = req.params.course_id;
    console.log("http://127.0.0.1:3001/api/course/"+course_id+"/resource");
    console.log(request);
    request("http://127.0.0.1:3001/api/course/"+course_id+"/resource",function(err,response,body){
        if (!err && response.statusCode == 200) {
            res.render("resources",{msg:"success",list:JSON.parse(body)["data"],params:req.params, session:req.session});
            //console.log('here');
        }else{
            res.render("resources",{msg:"failed, data api response faild", session:req.session,params:req.params});
        }
    });
};

exports.show = function(req,res,next){
	console.log("resource show");
	res.json({msg:"resource show"});
};

exports.download = function(req,res){
    var resource_id = req.params.resource_id;
    var Resource   = global.db.models.resource;
    Resource.findOne({where:{resource_id:resource_id}}).then(function(resource){
        res.download(resource.file_path);
    });
};