/**
 * Created by wangzhaoyi on 16/7/4.
 */
var PasswordValidator = require('../../libs/index').PasswordValidator;
var ResultConstructor = require('../../libs/index').ResultConstructor;
var Errors = require('../../libs/index').Errors;


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

exports.upload = require('./download/index');
