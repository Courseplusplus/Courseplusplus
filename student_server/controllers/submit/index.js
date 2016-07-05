var formidable = require('formidable');
var util = require('util');
var courId;
var assignId;
var teamId;
var fs = require('fs');

exports.index = function (req, res, next) {

};

function assert(condition, message) {
  if (!condition) {
    throw message || "Assertion failed";
  }
}

var getFilePath = function(originPath){
  console.log(originPath);
  console.log(courId);
  console.log(assignId);
  console.log(teamId);

  var _path = "./SubmitFolder/";
  _path = _path + courId + '/';
  stats = fs.lstatSync(_path);
  if (!stats.isDirectory()) {
    fs.mkdirSync(_path);
  }
  _path = _path + assignId + '/';
  stats = fs.lstatSync(_path);
  if (!stats.isDirectory()) {
    fs.mkdirSync(_path);
  }
  _path = _path + teamId + '/';
  stats = fs.lstatSync(_path);
  if (!stats.isDirectory()) {
    fs.mkdirSync(_path);
  }
  splited = originPath.split('/');
  _path+=splited[splited.length-1];
  console.log(_path);
  return _path;
};

exports.create = function (req, res, next) {
  var assignment_id = "1";
  var student_id = 13211014;
  //var student_id = req.session.user.student_id;
  //var course_id;

  var Assign = global.db.models.assignment;
  var Student = global.db.models.student;
  var Course = global.db.models.course;
  var Team = global.db.models.team;
  var Submit = global.db.models.submit;
  var _assignment;
  assignId = assignment_id;

  console.log("create");

  var form = new formidable.IncomingForm(),
    files = [],
    fields = [];

  form
    .on('field', function(field, value) {
      //console.log(field, value);
      fields.push([field, value]);
    })
    .on('file', function(field, file) {
      console.log(field, file);
      files.push([field, file]);
      Assign.find({
        where: {
          assignment_id: assignment_id
        }
      }).then(function(assignment){
        _assignment = assignment;
        return assignment.dataValues.course_id;
      }).then(function(course_id){
        courId = course_id;
        console.log("courId "+courId);
        Team.findAll({
          include: [{
            model: Student
          }],
          where: {
            "$students.student_id$": student_id,
            "course_id": course_id
          }
        }).then(function(teams){
          assert(teams.length==1);
          teamId = teams[0].team_id;
          console.log("teamId "+teamId);
          var team = teams[0];
          console.log(file.path);
          Submit.create({
            submitter_id: student_id,
            submit_time: new Date(),
            file_path: getFilePath(file.path),
            file_name: file.name
          }).then(function(submit){
            console.log(submit);
            team.setSubmits(submit);
            _assignment.setSubmits(submit);
            _ = getFilePath(file.path);
            console.log("new path "+_);
            fs.rename(file.path,_);
          });
        });
      });
    })
    .on('end', function() {
      console.log('-> upload done');
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received fields:\n\n '+util.inspect(fields));
      res.write('\n\n');
      res.end('received files:\n\n '+util.inspect(files));
    });
  form.parse(req);
};