/**
 * Created by peter on 7/10/16.
 */
exports.index = function(req,res){
	var Course = global.db.models.course;
	var Student = global.db.models.student;
	var student_id = req.session.user.student_id;
	Course.findById(req.body.course_id).then(function (course) {
		Student.findById(student_id).then(function (student) {
			res.render("chat",{course:course,student:student});
		})
	})

};