/**
 * Created by rikoizz on 16-7-8.
 */

var test = function(req, res){
    res.json(__filename);
};
var resource = require('../../../models/provider/resource');
var getAllResources = function(req, res){
    var course_id = req.params.course_id;
    resource.getAllResources(course_id).then(function(assignments){
        res.json({data: assignments});
    });
};
var getResource = function(req, res){
    var resource_id = req.params.resource_id;
    resource.getResource(resource_id).then(function(resource){
        res.json({data: resource});
    });
};

module.exports = {
    allResources: getAllResources,
    resource: getResource
};