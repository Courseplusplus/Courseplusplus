/**
 * Created by Obscurity on 2016/4/5.
 */

module.exports = {
	user: require('./user/'),
	course: require('./course'),
	index: function (req, res) {
		var Course = global.db.models.course;
		Course.findAll().then(function (courses) {
			res.render('index', {list: courses, session:req.session});
		});
	}
};