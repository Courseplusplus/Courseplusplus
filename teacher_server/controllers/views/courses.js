/**
 * Created by zhangxinru on 16/7/5.
 */

var request = require('request');

var courses = {
    allcourses: function(req,res){
        request("http://127.0.0.1:3001/allcourses",function(err,response,body){
            if (!err && response.statusCode == 200) {
                res.render('course',{list:JSON.parse(body)["data"]});
                //console.log('here');
            }
        });
    },
    resources: function(req,res){
        request("http://localhost:3001/resources",function(err,response,body){
            if(!err&& response.statusCode == 200){
                res.render('')
            }
        });
    }
};

module.exports = courses;