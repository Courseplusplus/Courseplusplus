/**
 * Created by rikoizz on 16-7-8.
 */
var db = require('../database');

var resource = db.models.resource;

var getAllResources = function(course_id){
    return resource.findAll({where: {course_id : course_id}});
};

var getResource = function(resource_id){
    return resource.findOne({where: {resource_id : resource_id}});
};

module.exports = {
    getAllResources : getAllResources,
    getResource     : getResource
};