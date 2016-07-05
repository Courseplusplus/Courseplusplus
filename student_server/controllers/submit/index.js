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

var getFilePath = function(){
  console.log(courId);
  console.log(assignId);
  console.log(teamId);

  var _path = "./SubmitFolder/";
  var _course = _path + courId + '/';
  fs.lstat(_course, function(err, stats) {
    // not dir
    if (!(!err && stats.isDirectory())) {
      fs.mkdirSync(_course);
    }
  });



  var _assign = _course + assignId + '/';
  fs.lstat(_assign, function(err, stats) {
    // not dir
    if (!(!err && stats.isDirectory())) {
      fs.mkdirSync(_assign);
    }
  });

  var _team = _assign + teamId + '/';
  fs.lstat(_team, function(err, stats) {
    // not dir
    if (!(!err && stats.isDirectory())) {
      fs.mkdirSync(_team);
    }
  });
  console.log(_team);
  return _team;
};

exports.create = function (req, res, next) {
  var assignment_id = "1";
  var student_id = "13211014";
  //var course_id;


  var Assign = global.db.models.assignment;
  var Student = global.db.models.student;
  var Course = global.db.models.course;
  var Team = global.db.models.team;
  var Submit = global.db.models.submit;
  var _assignment;
  assignId = assignment_id;


  Assign.find({
    where: {
      assignment_id: assignment_id
    }
  }).then(function(assignment){
    _assignment = assignment;
    return assignment.dataValues.course_id;
  }).then(function(course_id){
    courId = course_id;
    console.log(courId);
    Team.findAll({
      include: [{
        model: Student
      }],
      where: {
        "$students.student_id$": student_id,
        "course_id": course_id
      }
    }).then(function(teams){
      console.log(teams);
      assert(teams.length==1);
      teamId = teams[0].team_id;
      console.log(teams[0].team_name);
      var team = teams[0];
      Submit.create({
        submitter_id: student_id,
        submit_time: new Date(),
        file_path: getFilePath()
      }).then(function(submit){
        console.log(submit);
        team.setSubmits(submit);
        _assignment.setSubmits(submit);
      });
    });
  });

  console.log("create");

  var form = new formidable.IncomingForm(),
      files = [],
      fields = [];

    form.uploadDir = getFilePath();

    form
      .on('field', function(field, value) {
        console.log(field, value);
        fields.push([field, value]);
      })
      .on('file', function(field, file) {
        console.log(field, file);
        files.push([field, file]);
        fs.rename(file.path,getFilePath()+"/"+file.name);
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