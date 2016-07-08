/**
 * Created by peter on 7/8/16.
 */

exports.index = function(req,res){
	console.log("team index");
	res.json({msg:"team index"});
};

exports.create = function(req, res, next){
	console.log("team create");
	res.json({msg:"team create"});
};

exports.show = function(req, res, next){
	console.log("team show");
	res.json({msg:"team show"});
};

exports.apply = function(req, res, next){
	console.log("team apply");
	res.json({msg:"team apply"});
};

exports.create = function(req, res, next){
	console.log("team create");
	res.json({msg:"team create"});
};