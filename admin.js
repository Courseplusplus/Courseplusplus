/**
 * Created by wangzhaoyi on 16/7/8.
 */
var admin_server = require("./admin_server/server");
// var image_server = require("./image_server/server");
// var message_server = require("./message_server/server");

admin_server.set_globals();

var server = admin_server.listen(3002, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
