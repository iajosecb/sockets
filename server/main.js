// Servidor de node.js para iniciar un servidor con express
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
    id: 1,
    text: "Hello everyone",
    username: "Jose Cruz"
}];

// Para ficheros estaticos de la aplicacion
app.use(express.static('public'));

// Rutas REST
app.get('/Ok', function(req, res){
    res.status(200).send("Ok!");
})

io.on('connection', function(socket){
    console.log('User Connected');
    // Emite el mensaje que esta estatico en el array messages
    socket.emit('messages', messages);
    
    // Guardamos el mensaje en el array
    socket.on('newMessage', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

// Funcion que para indicar el puerto del servidor local
server.listen(8080, function(){
    console.log("Run server in port 8080");
});