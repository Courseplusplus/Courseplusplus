/**
 * Created by Obscurity on 2016/4/5.
 */
module.exports = {
    user: require('./user/'),
    index: function (req, res) {
        var Course = global.db.models.course;
        var Teacher_belongsto_course = global.db.models.teacher_belongsto_course;
        var teacher_id = req.session.user.teacher_id;
        Teacher_belongsto_course.findAll({where: {teacher_id: teacher_id}}).then(function (relations) {
            var len = relations.length;
            var cnt = 0;
            var courses = [];
            for (var index in relations) {
                var course_id = relations[index]['course_id'];
                cnt += 1;
                console.log(cnt);
                console.log(len);
                Course.findOne({where: {course_id: course_id}}).then(function (course) {
                    courses.push(course);
                    if (cnt == len) {
                        res.render('index', {list: courses, params: req.params, session: req.session});
                    }
                });
            }
            if (len == 0) {
                res.render('index', {list: courses, params: req.params, session: req.session});
            }
            //Course.findAll().then(function (courses) {
            //    console.log(ids);
            //    //res.json({id:ids});
            //    res.render('index', {list: courses, params:req.params,session:req.session});
            //});
        });
    },
    test: function (req, res) {
        res.json({msg: "hello"})
    }
};