/**
 * Created by wangzhaoyi on 16/7/4.
 */
var PasswordValidator = require('../../libs/index').PasswordValidator;
var ResultConstructor = require('../../libs/index').ResultConstructor;
var Errors = require('../../libs/index').Errors;
var request = require('request');

exports.create = function (req, res, next) {
    var Resource = global.db.models.resource;
    var resourceParams = {
        resource_type:req.body.resource_type,
        course_id:req.body.course_id,
        lesson:req.body.lesson,
        resource_name:req.body.resource_name,
        file_path:req.body.file_path
    };
    Resource.create(resourceParams).then(function(resource){
        if(resource){
            res.json(ResultConstructor.success({
                resource_id:Resource.resource_id,
                resource_type:Resource.resource_type,
                course_id:Resource.course_id,
                lesson:Resource.lesson,
                resource_name:Resource.resource_name,
                file_path:Resource.file_path
            }))
        }
        else {
            next(new Errors.errors_500.InternalServerError())
        }
    });
};
exports.resources = function(req,res){
    var course_id = req.params.course_id;
    console.log("http://127.0.0.1:3000/data/allresources/"+course_id);
    console.log(request);
    request("http://127.0.0.1:3000/data/allresources/"+course_id,function(err,response,body){
        if (!err && response.statusCode == 200) {
            res.render("resources",{msg:"success",list:JSON.parse(body)["data"],params:req.params});
            //console.log('here');
        }else{
            res.render("resources",{msg:"failed, data api response faild"});
        }
    });
};
exports.update = function(req,res,next){
    var Resource = global.db.models.resource;
    Resource.find({where:{resource_id:req.body.resource_id}}).then(function (resource) {
        if(resource) {
            var updateParams = {
                resource_type: req.body.resource_type,
                course_id: req.body.course_id,
                lesson: req.body.lesson,
                resource_name: req.body.resource_name,
                file_path: req.body.file_path
            };
            for (var key in updatedParams) {
                if (updateParams[key]) {
                    Resource[key] = updateParams[key];
                }
            }
            return Resource.save();
        }
        else {
            next(new Errors.errors_404.UserNotFoundError("No such Resource"));
        }
    }).then(function(refreshed_resource){
        res.json(ResultConstructor.success({
            resource_id:Resource.resource_id,
            resource_type:Resource.resource_type,
            course_id:Resource.course_id,
            lesson:Resource.lesson,
            resource_name:Resource.resource_name,
            file_path:Resource.file_path
        }));
    });
};

exports.upload = require('./upload/index');
