/**
 * Created by rikoizz on 16-7-8.
 */


var test = function(req, res){
    res.json(__filename);
};
var submit = require('../../../models/provider/submit');
var getAllSubmits = function(req, res){
    var assignment_id = req.params.assignment_id;
    //console.log('here');
    submit.getAllSubmits(assignment_id, res);
};
var getSubmit = function(req, res){
    var submit_id = req.params.submit_id;
    submit.getSubmit(submit_id).then(function(submit){
        res.json({data: submit});
    });
};

module.exports = {
    allSubmits: getAllSubmits,
    submit: getSubmit
};