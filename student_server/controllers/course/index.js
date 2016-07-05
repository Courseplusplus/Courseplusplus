exports.index = function(req, res, next){
  var Course = global.db.models.course;
  Course.findById(req.params.id).then(function(course) {
    console.log(course);
      res.render('course',{course: course});
  });
};