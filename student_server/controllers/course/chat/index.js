/**
 * Created by peter on 7/10/16.
 */
exports.index = function(req,res){
	var Course = global.db.models.course;
	Course.findById(req.body.course_id).then(function (course) {
		res.render("chat",course);
	})

};