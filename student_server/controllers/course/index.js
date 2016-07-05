exports.index = function(req, res, next){
    var Course = global.db.models.course;
    Course.findAll().then(function(course) {
        res.json(ResultConstructor.success({
            course_name: course.course_name,
            introduction: course.introduction,
            term: course.term,
            course_id: course.course_id
        }));
    }).catch(function (err) {
            next(err);
    });
}