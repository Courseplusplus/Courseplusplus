exports.index = function(req, res, next){
    var Course = global.db.models.course;
    Course.findAll().then(function(courses) {
        res.json(courses);
    });
};