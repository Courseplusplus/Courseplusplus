/**
 * Created by peter on 7/11/16.
 */
var student_server = require("./student_server/server");

student_server.set_globals();

var _student_server = student_server.listen(3000, function () {
	var host = _student_server.address().address;
	var port = _student_server.address().port;

	console.log('student server listening at http://%s:%s', host, port);
});
var teacher_server = require("./teacher_server/server");

teacher_server.set_globals();

var _teacher_server = teacher_server.listen(3001, function () {
	var host = _teacher_server.address().address;
	var port = _teacher_server.address().port;

	console.log('teacher server listening at http://%s:%s', host, port);
});

var admin_server = require("./admin_server/server");

admin_server.set_globals();

var _admin_server = admin_server.listen(3002, function () {
	var host = _admin_server.address().address;
	var port = _admin_server.address().port;

	console.log('admin server listening at http://%s:%s', host, port);
});

var chat_app = require('express')();
var http = require('http').Server(chat_app);
var io = require('socket.io')(http);

chat_app.get('/', function(req, res){
	res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		console.log(msg);
		io.emit('chat message', msg);
	});
});

http.listen(3003, function(){
	console.log('chat app listening on *:3003');
});