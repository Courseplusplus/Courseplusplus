/**
 * Created by Obscurity on 2016/4/5.
 */

module.exports = {
    user: require('./users/index'),
    groups: require('./groups/index'),
    submit: require('./submit'),
    test: function (req, res) {
        res.json({msg:"hello world"});
    },
    index: function(req,res){
        res.render('index');
    }
};