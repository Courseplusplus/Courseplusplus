/**
 * Created by wangzhaoyi on 16/7/11.
 */
var db = require('../database/index');
var Term = db.models.term;
var moment = require('moment');

exports.getCurrentWeek = function(res){
    var currentDate = moment().format();
    Term.findOne({
        where:{
            $and:{
                start_date:{$lte: currentDate},
                end_date:{$gte: currentDate}
            }
        }
    }).then(function(term){
        var currentWeek = moment().format("WW")-moment(term.start_date).format("WW");
        res.json({data : {current_week:currentWeek}});
    })
};