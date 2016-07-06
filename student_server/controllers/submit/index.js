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
  try{
    stats = fs.lstatSync(_path);

  }catch (e){
    fs.mkdirSync(_path);
  }
  _path = _path + assignId + '/';
  try{
    stats = fs.lstatSync(_path);

  }catch (e){
    fs.mkdirSync(_path);
  }
  _path = _path + teamId + '/';
  try{
    stats = fs.lstatSync(_path);

  }catch (e){
    fs.mkdirSync(_path);
  }
  //_path = _path + assignId + '/';
  //stats = fs.lstatSync(_path);
  //if (!stats.isDirectory()) {
  //  fs.mkdirSync(_path);
  //}
  //_path = _path + teamId + '/';
  //stats = fs.lstatSync(_path);
  //if (!stats.isDirectory()) {
  //  fs.mkdirSync(_path);
  //}
  splited = originPath.split('/');
  _path+=splited[splited.length-1];
  console.log(_path);
  return _path;
};

exports.create = function (req, res, next) {
  ids = req.originalUrl.split("/");
  var course_id = ids[2];
  var assignment_id = ids[4];
  var student_id = req.session.user.student_id;
  console.log("create");
  console.log(course_id);
  console.log(assignment_id);
  console.log(student_id);


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
          new_file_path = getFilePath(file.path);
          Submit.create({
            submitter_id: student_id,
            submit_time: new Date(),
            file_path: new_file_path,
            file_name: file.name,
            assignment_id: assignment_id,
            team_id: teamId
          }).then(function(submit){
            console.log("new path "+new_file_path);
            fs.rename(file.path,new_file_path);
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