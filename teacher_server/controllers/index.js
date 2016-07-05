/**
 * Created by Obscurity on 2016/4/5.
 */
module.exports = {
    user: require('./users/index'),
    groups: require('./groups/index'),
    index: function (req, res) {
        res.render('index',{title:'软件工程过程',path:'/js/index.js'});
    },
    test:function(req,res){
        res.json({msg:"hello"})
    }
};