var formidable = require('formidable');
var util = require('util');
var courId;
var assignId;
var teamId;
var fs = require('fs');
var archiver = require('archiver');
var path = require('path');

exports.index = function (req, res, next) {
	console.log("assignment index");
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
	}).then(function (assignments) {
		console.log(assignments);
		console.log(_course);
		res.render('assignment', {assignments: assignments, course: _course});
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
	var Student_belongsto_Team = global.db.models.student_belongsto_team;
	console.log('here0');
	Assignment.findById(assignment_id).then(function (assignment) {
		console.log('here1');
		Course.findById(course_id).then(function (course) {
			console.log(student_id);
			Student_belongsto_Team.findAll({
				where: {
					student_id : student_id
				}
			}).then(function (student_bl_teams) {
				console.log('here2');
				for (var index in student_bl_teams) {
					Team.findById(student_bl_teams[index].team_id).then(function (team) {
						console.log('here3');
						if (team.course_id == course_id) {
							Submit.findAll({
								where: {
									team_id: team.team_id,
									assignment_id: assignment.assignment_id
								}
							}).then(function (submits) {
								res.render('submit', {course: course, assignment: assignment, team: team, submits: submits});
							});
						}
					})
				}
			});
		});
	});
};

var getFilePath = function (originPath) {
	console.log(originPath);
	console.log(courId);
	console.log(assignId);
	console.log(teamId);

	var _path = "./SubmitFolder/";
	_path = _path + courId + '/';
	try {
		stats = fs.lstatSync(_path);

	} catch (e) {
		fs.mkdirSync(_path);
	}
	_path = _path + assignId + '/';
	try {
		stats = fs.lstatSync(_path);

	} catch (e) {
		fs.mkdirSync(_path);
	}
	_path = _path + teamId + '/';
	try {
		stats = fs.lstatSync(_path);

	} catch (e) {
		fs.mkdirSync(_path);
	}
	splited = originPath.split('/');
	_path += splited[splited.length - 1];
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
		.on('field', function (field, value) {
			//console.log(field, value);
			fields.push([field, value]);
		})
		.on('file', function (field, file) {
			console.log(field, file);
			files.push([field, file]);
			Assign.find({
				where: {
					assignment_id: assignment_id
				}
			}).then(function (assignment) {
				_assignment = assignment;
				return assignment.dataValues.course_id;
			}).then(function (course_id) {
				courId = course_id;
				console.log("courId " + courId);
				Team.findAll({
					include: [{
						model: Student
					}],
					where: {
						"$students.student_id$": student_id,
						"course_id": course_id
					}
				}).then(function (teams) {
					assert(teams.length == 1);
					teamId = teams[0].team_id;
					console.log("teamId " + teamId);
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
					}).then(function (submit) {
						console.log("new path " + new_file_path);
						fs.rename(file.path, new_file_path);
					});
				});
			});
		})
		.on('end', function () {
			// 302 jump
			res.writeHead(302, {
				'Location': '/course/' + course_id + '/assignment/' + assignment_id
			});
			res.end();
		});
	form.parse(req);
};

var zip_filename = function (file_path) {
	var _folder_name = path.dirname(file_path);
	var _filename = _folder_name.split("/").join("_");
	if (_filename[0] === ".") {
		_filename = _filename.substr(1);
	}
	return _filename + ".zip";
};

exports.download = function (req, res) {
	var archive = archiver('zip');


	console.log("download");
	var Submit = global.db.models.submit;
	var Team = global.db.models.team;
	var Student = global.db.models.student;
	var ids = req.originalUrl.split("/");
	var courId = ids[2];
	var assignId = ids[4];
	var student_id = req.session.user.student_id;

	Team.findAll({
		include: [{
			model: Student
		}],
		where: {
			"$students.student_id$": student_id,
			"course_id": courId
		}
	}).then(function (teams) {
		assert(teams.length == 1, "teams.length!=1");
		var team = teams[0];
		Submit.findOne({
			where: {
				assignment_id: assignId,
				team_id: team.team_id
			}
		}).then(function (submit) {
			var _zip_filename = zip_filename(submit.file_path);
			console.log(_zip_filename);
			console.log(submit.file_path);
			//set the archive name
			res.attachment(_zip_filename);

			//this is the streaming magic
			archive.pipe(res);

			archive.file(submit.file_path);
			archive.finalize();
		});
	});
};