exports.assignment = require("./assignment");
exports.resource = require("./resource");
exports.team = require("./team");
exports.chat = require("./chat");

exports.index = function(req,res){
  console.log("course index.js");
  res.json({msg:"course index.js"});
};

exports.single = function(req, res, next){
  var Course = global.db.models.course;
  Course.findById(req.params.course_id).then(function(course) {
    console.log(course);
      res.render('course',{course: course, session:req.session});
  });
};