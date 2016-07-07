var formidable = require('formidable');
var util = require('util');
var courId;
var assignId;
var teamId;
var fs = require('fs');

exports.index = function (req, res, next) {
  course_id = req.params.id;
  console.log(course_id);
  student_id = req.session.user.student_id;
  var _course;
  var Assignment = global.db.models.assignment;
  var Course = global.db.models.course;
  Course.findById(course_id).then(function (course) {
    _course = course;
  });
  Assignment.findAll({
    where: {
      course_id: course_id
    }
  }).then(function(assignments){
    console.log(assignments);
    console.log(_course);
    res.render('assignment', {assignments: assignments,course:_course});
  });
};

function assert(condition, message) {
  if (!condition) {
    throw message || "Assertion failed";
  }
}

exports.show = function (req, res, next) {
  var student_id = req.session.user.student_id;
  var assignment_id = req.params.id;
  var course_id = req.originalUrl.match(/\d+/g)[0];
  console.log(assignment_id);
  console.log(course_id);
  var Assignment = global.db.models.assignment;
  var Course = global.db.models.course;
  var Student = global.db.models.student;
  var Team = global.db.models.team;
  var Submit = global.db.models.submit;
  Assignment.findById(assignment_id).then(function (assignment) {
    Course.findById(course_id).then(function (course) {
      Team.findAll({
        include: [{
          model: Student
        }],
        where: {
          "$students.student_id$": student_id,
          "course_id": course_id
        }
      }).then(function (teams) {
        assert(teams.length==1,"teams.length!=1");
        Submit.findAll({
          where: {
            team_id: teams[0].team_id,
            assignment_id: assignment.assignment_id
          }
        }).then(function (submits) {
          res.render('submit', {course: course, assignment: assignment, team: teams[0], submits: submits});
        });

      });
    });
  });
};

exports.create = function (req, res, next) {

};