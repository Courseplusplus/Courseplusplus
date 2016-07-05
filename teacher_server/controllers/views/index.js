/**
 * Created by zhangxinru on 16/7/5.
 */

var request = require('request');

var index = {
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