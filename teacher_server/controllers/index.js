/**
 * Created by Obscurity on 2016/4/5.
 */
module.exports = {
    user: require('./users/index'),
    groups: require('./groups/index'),
    test: function (req, res) {
        res.render('index',{title:'hello'},function(err, html) {
            console.log(err);
            res.send(html);
        });
    }
};