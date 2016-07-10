exports.assignment = require("./assignment");
exports.resource = require("./resource");
exports.team = require("./team");

exports.index = function(req,res){
  console.log("course index.js");
  res.json({msg:"course index.js"});
};

exports.single = function(req, res, next){
  var Course = global.db.models.course;
  Course.findById(req.params.id).then(function(course) {
    console.log(course);
      res.render('course',{course: course});
  });
};