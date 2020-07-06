let socketio = {}

function getSocket(server) {
    socketio.io = require('socket.io')(server);

    let io = socketio.io;
    io.on('connection', (socket) => {
      
    });

}

socketio.getSocket = getSocket;

module.exports = socketio