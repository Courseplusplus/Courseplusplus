/**
 * Created by xuhanzhi on 16-7-5.
 */
var Errors = require('../../libs').Errors;
var ResultConstructor = require('../../libs').ResultConstructor;

exports.create = function (req, res, next) {
    var Assignment = global.db.models.assignments;
    var assignmentparam = {
        type: req.body.assignment_type,
        course_id: req.body.course_id,
        lesson_id: req.body.lesson_id,
        deadline: req.body.deadline,
        file_path: req.body.file_path
    };

    Assignment.create(assignmentparam).then(function (assignment) {
        if(assignment) {
            res.json(ResultConstructor.success({
                type: assignment.type,
                course_id: assignment.course_id,
                lesson_id: assignment.lesson_id,
                deadline: assignment.deadline,
                file_path: assignment.file_path
            }));
        } else {
            res.json("创建失败");
        }
    }).catch(function (err) {
        next(err);
    })
}

exports.destroy = function (req, res, next) {
    var Assignment = global.db.models.assignments;
    var assignment_id = req.body.assignment_id;

    Assignment.find({where: {assignment_id: assignment_id}}).then(function (assignment) {
        if(!assignment){
            res.json("未找到该任务");
        } else {
            return assignment.destroy();
        }
    }).catch(function (err) {
        next(err);
    })
};

exports.index = function (req, res, next) {
    var Assignment = global.db.models.assignments;
    var assignment_id = req.body.assignment_id;

    Assignment.find({where: {assignment_id: assignment_id}}).then(function (assignment) {
        if(!assignment) {
            res.json("未找到该任务");
        } else {
            var result_params = [];
            group.users.forEach(function (assignmenta) {
                result_params.push({
                    type: assignmenta.type,
                    course_id: assignmenta.course_id,
                    lesson_id: assignmenta.lesson_id,
                    deadline: assignmenta.deadline,
                    file_path: assignmenta.file_path
                });
            });
            res.json("hahaha");
            res.json(ResultConstructor.success(result_params));
            //res.render("give assignment",{});
        }
        
    }).catch(function (err) {
        next(err);
    })
};

exports.updated = function (req, res, next) {
    var Assignment = global.db.models.assignments;
    var assignment_id = req.body.assignment_id;

    Assignment.find({where: {assignment_id: assignment_id}}).then(function (assignment) {
        if(!assignment) {
            res.json("未找到该任务");
        } else {
            var updated_data = {
                type: req.body.assignment_type,
                course_id: req.body.course_id,
                lesson_id: req.body.lesson_id,
                deadline: req.body.deadline,
                file_path: req.body.file_path
            };
            for (var key in updated_data) {
                if (updated_data[key]) {
                    assignment[key] = updated_data[key];
                }
            }
        }
    }).then(function (new_assignment) {
        res.json(ResultConstructor.success({
            type: new_assignment.type,
            course_id: new_assignment.course_id,
            lesson_id: new_assignment.lesson_id,
            deadline: new_assignment.deadline,
            file_path: new_assignment.file_path
        }));
    }).catch(function (err) {
        next(err);
    })
}

module.exports = exports;
