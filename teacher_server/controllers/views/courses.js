/**
 * Created by zhangxinru on 16/7/5.
 */

var request = require('request');

var courses = {
    allcourses: function(req,res){
        console.log('here');
        request("http://127.0.0.1:3001/allcourses",function(err,response,body){
            if (!err && response.statusCode == 200) {
                res.render('course',{list:JSON.parse(body)["data"]});

            }
        });
    }
};

module.exports = courses;