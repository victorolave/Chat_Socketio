const path = require('path')

const exprees = require('express');
const app = exprees();

///Settings
app.set('port', process.env.PORT || 5000);

//Static Files
app.use(exprees.static(path.join(__dirname, 'public')));

//Start Server
const server = app.listen(app.get('port'), () => {
    console.log('Server is on! 🚀', app.get('port'));
});


//WebSockets
const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', (socket) => {
    console.log("New Connection", socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
})