var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 3000;

app.use(express.static(__dirname + '/'));

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
        console.log(msg);
    });
});

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});