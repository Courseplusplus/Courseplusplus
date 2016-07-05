/**
 * Created by zhangxinru on 16/7/5.
 */

var request = require('request');

var config = require('../../config.json');
var db = require('../../models')(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    config.mysql.config
);
var Assignments = db.models.assignment;

var index = {
    index:function(req,res){
        req.session.course_id = 1;
        console.log(req.session);
        //if(req.session.course_id){
        //    var course_id = req.session.course_id;
        //    var assignment_ids = [];
        //    Assignments.findAll({course_id:course_id}).then(function(assignments){
        //        if(assignments){
        //            for(var index in assignments){
        //                assignment_ids.push(assignments[index].assignment_id);
        //            }
        //        }
        //        res.render('assignments',{assignment_ids:assignment_ids});
        //    });
        //}else{
        //    res.json({msg:"failed, course_id hasn't set into session",status:-1});
        //}
        res.json({msg:'hello'});
    },
    assignments: function(req,res){
        var assignment_id = req.params.assignment_id;
        request("http://127.0.0.1:3001/download/list/"+assignment_id,function(err,response,body){
            if (!err && response.statusCode == 200) {
                res.render('download',{list:JSON.parse(body)["data"]});
            }
        });
    }
};

module.exports =  index;