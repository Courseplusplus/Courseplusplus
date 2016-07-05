/**
 * Created by Obscurity on 2016/5/13.
 */

var student_server = require("./student_server/server");
// var image_server = require("./image_server/server");
// var message_server = require("./message_server/server");
var teacher_server = require("./teacher_server/server");

student_server.set_globals();

var server = student_server.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
