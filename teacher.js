/**
 * Created by Obscurity on 2016/5/13.
 */

var teacher_server = require("./teacher_server/server");
// var image_server = require("./image_server/server");
// var message_server = require("./message_server/server");

teacher_server.set_globals();

var server = teacher_server.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
