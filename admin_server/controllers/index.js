/**
 * Created by Obscurity on 2016/4/5.
 */
var request = require('request');
module.exports = {
    courses:require('./courses/index'),
    teachers:require('./teachers/index'),
    students:require('./students/index'),
    index: function (req, res) {
        request('http://127.0.0.1:3002/data_provider/current_week',function(err,response,body){
            res.render('index',{week:JSON.parse(body)['data']});
        });
        //res.json({msg:"index of admin server", params:req.params});
    },
    term:function (req,res) {
        var Term = global.db.models.term;
        Term.create({
            term_id:req.body.term_id,
            start_date:req.body.start_date,
            end_date:req.body.end_date
        }).then(function(term){
            request('http://127.0.0.1:3002/data_provider/current_week',function(err,response,body){
                res.render('index',{week:JSON.parse(body)['data']});
            });
        })
    },
    displayterm:function(req,res){
        res.render('set')
    }
};