/**
 * Created by Obscurity on 2016/4/5.
 */
var request = require('request');
module.exports = {
    courses:require('./courses/index'),
    teachers:require('./teachers/index'),
    students:require('./students/index'),
    index: function (req, res) {
        //concole.log("index index")
        res.render('index');
        //res.json({msg:"index of admin server", params:req.params});
    },
    set:function (req,res) {
        var term = req.param.term;
        var week = req.param.week;
        var total_week = req.param.total_week;
        var Term = global.db.models.term;
        var termparam = {
            start_date : req.body.start_date,
            end_date : req.body.end_date,
            total_week : req.body.total_week
        };
        Term.create(termparam);
        
    }
    
};