/**
 * Created by peter on 7/8/16.
 */

exports.index = function (req, res) {

	var student_id = req.session.user.student_id;
	var Team = global.db.models.team;
	var Course = global.db.models.course;
	var Student_belongsto_Team = global.db.models.student_belongsto_team;
	var Student = global.db.models.student;
	var ids = req.originalUrl.split("/");
	var course_id = ids[2];

	Course.findById(course_id).then(function (course) {
		Team.findAll({
			where: {
				"course_id": course_id
			}
		}).then(function (teams) {
			var dg = function (i) {
				if (i == teams.length) {
					teams1 = [];
					for (var index in teams) {

						teams1.push({
							"team_name": teams[index].dataValues.team_name,
							"permission": teams[index].dataValues.permission,
							"team_id": teams[index].dataValues.team_id,
							"accept_status": teams[index].dataValues.accept_status
						});
					}
					console.log(teams1);
					res.render("teams", {teams: teams1, course: course});
					//res.json({teams:teams1});
					return;
				}
				Student_belongsto_Team.findOne({
					where: {
						team_id: teams[i].dataValues.team_id,
						student_id: student_id
					}
				}).then(function (student_team) {
					if (student_team == null) {
						console.log(teams[i]);
						teams[i].dataValues.accept_status = 'Not Apply'
					}
					else {
						// student_team of one student and of one team must be exist once
						teams[i].dataValues.accept_status = student_team.dataValues.accepted;
					}
					dg(i + 1);
				});
			};
			dg(0);
		});
	});
};

exports.create = function (req, res, next) {
	var Team = global.db.models.team;
	var team_name = req.body.team_name;
	console.log(team_name);
	var ids = req.originalUrl.split("/");
	var course_id = ids[2];
	var student_id = req.session.user.student_id;
	var Student_belongsto_Team = global.db.models.student_belongsto_team;
	var Student = global.db.models.student;

	//先判断学生是否在这门课里面已经加入团队;
	Team.findAll({
		include: [{model: Student_belongsto_Team, as: "link_team"}],
		where: {
			"$link_team.student_id$": student_id,
			"course_id": course_id,
			"$link_team.accepted$": 'ACCEPTED'
		}
	}).then(function (teams) {
		console.log(teams);
		if (teams.length == 0) {
			//该学生未加入任何团队
			//创建团队
			Team.create({
				"team_name": team_name,
				"course_id": course_id,
				"student_id": student_id
			}).then(function (team) {
				Student_belongsto_Team.create({
					"team_id": team.team_id,
					"student_id": student_id,
					"accepted": "ACCEPTED"
				}).then(function (student_belongsto_team) {
					console.log(student_belongsto_team);
					res.json({msg: "success"})
				});
			});
		}
		else {
			assert(teams.length == 1);
			res.json({msg: "fail"});
		}
	});
};

exports.show = function (req, res, next) {
	var Team = global.db.models.team;
	var Course = global.db.models.course;
	var Student = global.db.models.student;
	var ids = req.originalUrl.split("/");
	var course_id = ids[2];
	var team_id = ids[4];
	var student_id = req.session.user.student_id;
	var Student_belongsto_Team = global.db.models.student_belongsto_team;
	// Student_belongsto_Team 中关于team的所有学生,包括Not Decided 和 rejected
	var team_members = [];
	Team.findById(team_id).then(function (team) {
		Course.findById(course_id).then(function (course) {
			Student.findById(student_id).then(function (student) {
				student = {
					student_id: student.student_id,
					name: student.name,
					telephone: student.telephone
				};
				Student.findById(team.student_id).then(function (leader) {
					leader = {
						student_id: leader.student_id,
						name: leader.name,
						telephone: leader.telephone
					};
					Student_belongsto_Team.findAll({
						where: {
							"team_id": team_id
						}
					}).then(function (student_bl_teams) {
						var cnt = 0;
						var mp = {};
						for (var idx = 0; idx < student_bl_teams.length; idx++) {
							ky = student_bl_teams[idx].dataValues.student_id;
							mp[ky] = student_bl_teams[idx].dataValues.accepted;
							Student.findById(student_bl_teams[idx].dataValues.student_id).then(function (member) {
								team_members.push({
									student_id: member.student_id,
									name: member.name,
									telephone: member.telephone,
									accepted: mp[member.student_id]
								});

								cnt++;
								if (cnt == student_bl_teams.length) {
									//res.json({
									//	team: team,
									//	course: course,
									//	student: student,
									//	leader: leader,
									//	team_members: team_members
									//});
									res.render("team", {
										team: team,
										course: course,
										student: student,
										leader: leader,
										team_members: team_members
									});
								}
							})
						}
					})
				})
			})
		})
	})
};

exports.apply = function (req, res, next) {
	var Team = global.db.models.team;
	var team_id = req.params.id;
	console.log(team_id);
	var ids = req.originalUrl.split("/");
	var course_id = ids[2];
	var student_id = req.session.user.student_id;
	var Student_belongsto_Team = global.db.models.student_belongsto_team;
	//var Student = global.db.models.student;
	//先判断学生是否在这门课里面已经加入团队;
	Team.findAll({
		include: [{model: Student_belongsto_Team, as: "link_team"}],
		where: {
			"$link_team.student_id$": student_id,
			"course_id": course_id,
			"$link_team.accepted$": 'ACCEPTED'
		}
	}).then(function (teams) {
		console.log(teams);
		if (teams.length == 0) {
			//该学生未加入任何团队
			//创建申请记录
			Student_belongsto_Team.create({
				"team_id": team_id,
				"student_id": student_id,
				"accepted": "NOT DECIDED"
			});
			res.json({msg: "success"});
		}
		else {
			assert(teams.length == 1);
			res.json({msg: "fail"});
		}
	});
};

exports.check = function (req, res, next) {
	var Team = global.db.models.team;
	var ids = req.originalUrl.split("/");
	var course_id = ids[2];
	var team_id = ids[4];
	var student_id = ids[6];
	console.log(student_id);
	var Student_belongsto_Team = global.db.models.student_belongsto_team;

	Team.findAll({
		where: {
			"course_id": course_id
		}
	}).then(function (teams) {
		var f = function (idx, SetAccepted) {
			if (idx == teams.length) {
				SetAccepted();
			}
			Student_belongsto_Team.findOne({
				where: {
					"team_id": teams[idx].team_id,
					"student_id": student_id
				}
			}).then(function (student_bl_team) {
				if (student_bl_team &&  student_bl_team.dataValues.accepted == "ACCEPTED") {
					res.json({msg: "has team"});
				}
				else {
					f(idx + 1, SetAccepted);
				}
			});
		};
		f(0,SetAccepted);
	});
	var SetAccepted = function () {
		Student_belongsto_Team.findOne({
			where: {
				"team_id": team_id,
				"student_id": student_id
			}
		}).then(function (student_bl_team) {
			console.log(student_bl_team);
			student_bl_team.update({
				accepted: req.body.accepted
			}).then(function () {
				res.json({msg: "success"});
			})
		});
	};

};

function assert(condition, message) {
	if (!condition) {
		throw message || "Assertion failed";
	}
}