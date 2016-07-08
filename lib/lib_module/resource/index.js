/**
 * Created by rikoizz on 16-7-8.
 */

var test = function(){
    console.log(__filename);
};

var getAllResources = test;
var getResource = test;

module.exports = {
    allResources: getAllResources,
    Resource: getResource
};