var io = require('socket.io').listen(8001);
var express = require('express');
var app = express();

var root = {'root': '.'};


app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile('/views/index.html', root);
});

app.get('/chat', function(req, res){
	res.sendFile('/views/chat.html', root);
});

app.get('/welcome', function(req, res){
	res.sendFile('/views/welcome.html', root);
});

app.listen(8000);

io.sockets.on('connection', function (socket) {

	socket.on('sendchat', function (data) {

		if (!data || !data.msg)
			return;

		io.sockets.emit('chatupdate', {from: data.from, msg: data.msg});
	});

	socket.on('userjoined', function(username){
		console.log('user ' + username + ' joined');
		io.sockets.emit('chatupdate', {from: 'Chat Admin', msg: username + ' has joined the room'});
	});

});
