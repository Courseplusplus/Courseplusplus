//var tool = require('../download/libs/tool');
var request = require('request');

module.exports = {
    index: function (req, res) {
        var assignment_id = req.params.assignment_id;
        request("http://localhost:3001/download/list/"+assignment_id,function(err,response){
            // 302 jump
            res.writeHead(302, {
                'Location': '/course/'+1+'/assignment/'+1
            });
        });
        //tool.getList(res, req.params.assignment_id);
    }
};