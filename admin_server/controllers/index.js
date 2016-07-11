/**
 * Created by Obscurity on 2016/4/5.
 */
var request = require('request');
module.exports = {
    courses:require('./courses/index'),
    teachers:require('./teachers/index'),
    students:require('./students/index'),
    index: function (req, res) {
        res.render('index');
        //res.json({msg:"index of admin server", params:req.params});
    },
    term:function (req,res) {
        console.log(req.params);
        /*var term = req.params.term;
        var Term = global.db.models.term;
        var termparam = {
            start_date : req.body.start_date,
            end_date : req.body.end_date,
            total_week : req.body.total_week
        };
        Term.create(termparam);*/
    }
    
};