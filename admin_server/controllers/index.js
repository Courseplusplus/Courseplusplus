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
        var Term = global.db.models.term;
        Term.create({
            term_id:req.body.term_id,
            start_date:req.body.start_date,
            end_date:req.body.end_date
        }).then(function(term){
            res.render('index');
        })
    },
    displayterm:function(req,res){
        res.render('set')
    }
};