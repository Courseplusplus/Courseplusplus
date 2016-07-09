/**
 * Created by peter on 7/8/16.
 */

exports.index = function (req, res) {

	var student_id = req.session.user.student_id;
	var Team = global.db.models.team;
	var Student_belongsto_Team = global.db.models.student_belongsto_team;
	var Student = global.db.models.student;
	var ids = req.originalUrl.split("/");
	var course_id = ids[2];

	var belong;

	Student.findOne({
		where: {
			student_id: student_id
		}
	}).then(function (student) {
		sequelize.query("SELECT * FROM team JOIN student_belongsto_teams ON team.course_id = posts.user_id WHERE users.year_birth = 1984", { type: sequelize.QueryTypes.SELECT})
			.then(function(users) {
				// We don't need spread here, since only the results will be returned for select queries
			});
		Team.findAll({
			include: [{
				model: Student_belongsto_Team
			}],
			where: {
				"$student_belongsto_teams.student_id$": student_id,
				"course_id": course_id,
				"$student_belongsto_teams.accepted$": 'ACCEPTED'
			}
		}).then(function (teams) {
			console.log(teams);
			if (teams.length == 0) {
				belong = 'No ';
			}
			else {
				belong = teams[0].team_name;
			}
			Team.findAll({}).then(function (teams) {

				var dg = function(i){
					if(i==teams.length) {
						return;
					}

					teams[i].getStudents({
						where: {
							student_id: student_id
						}
					}).then(function (sta) {
						if (sta.length == 0) {
							teams[i].status1 = 'no';
						}
						else {
							teams[i].status1 = sta[0].accepted;
						}
					});

					dg(i+1);
				};

				dg(0);

				//res.render("team_list", {belong: belong, teams: teams});
				res.json({belong: belong, teams: teams});
			});
		});
	});
};

exports.create = function (req, res, next) {

	console.log("team create");
	res.json({msg: "team create"});
};

exports.show = function (req, res, next) {
	console.log("team show");
	res.json({msg: "team show"});
};

exports.apply = function (req, res, next) {
	console.log("team apply");
	res.json({msg: "team apply"});
};

exports.check = function (req, res, next) {
	console.log("team create");
	res.json({msg: "team create"});
};