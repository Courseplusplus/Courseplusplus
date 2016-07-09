/**
 * Created by rikoizz on 16-7-8.
 */
var db = require('../database/index');

var submit = db.models.submit;
var assignment = db.models.assignment;
var course = db.models.course;
var getTeam = require('../team').getTeam;
var lib = require('../lib');

var getAllSubmits = function(assignment_id, response){
    var res = {};
    console.log('1');
    return assignment.findOne({where: {assignment_id: assignment_id}}).then(function(assignment){
        console.log('1');
        var course_id = assignment.course_id;
        res.assignment = assignment;
        course.findOne({where:{course_id : course_id}}).then(function(course){
            console.log('2');
            res.course = course;
            submit.findAll({where : {assignment_id : assignment_id}}).then(function(submits){
                console.log('3');
                var len = submits.length;
                lib.For(submits, getTeam, 0, len, response, res);
                //     console.log('4');
                //     res.submits = items;
                //     return items;
                // });
            });
        });
    });
};

var getSubmit = function(submit_id){
    return submit.findOne({where: {submit_id : submit_id}});
};

module.exports = {
    getAllSubmits : getAllSubmits,
    getSubmit     : getSubmit
};