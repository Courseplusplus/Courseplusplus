/**
 * Created by Obscurity on 2016/4/5.
 */
var request = require('request');
module.exports = {
    courses:require('./courses/index'),
    teachers:require('./teachers/index'),
    students:require('./students/index'),
    index: function (req, res) {
        //concole.log("index index")
        res.render('index');
        //res.json({msg:"index of admin server", params:req.params});
    }
};