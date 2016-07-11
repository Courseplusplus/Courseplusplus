/**
 * Created by wangzhaoyi on 16/7/11.
 */
var term   = require('../../../models/provider/term');

exports.getCurrentWeek = function(req,res){
    //console.log(current_date);
    term.getCurrentWeek(res);
};