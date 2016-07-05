//var tool = require('../download/libs/tool');
var request = require('request');

module.exports = {
    index: function (req, res) {
        var assignment_id = req.params.assignment_id;
        request("http://localhost:3001/download/list/"+assignment_id,function(err,response){
            res.render('download',response.body);
        });
        //tool.getList(res, req.params.assignment_id);
    }
};