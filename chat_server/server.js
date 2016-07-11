var chat_app = require('express')();
var http = require('http').Server(chat_app);
var io = require('socket.io')(http);
app.use(express.static(path.join(__dirname,'public')));

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		console.log(msg);
		io.emit('chat message', msg);
	});
});

http.listen(3003, function(){
	console.log('chat app listening on *:3003');
});