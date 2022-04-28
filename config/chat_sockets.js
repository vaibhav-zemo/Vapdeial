
module.exports.chatSockets = function(socketServer) {
    let io = require('socket.io')(socketServer, {
        cors: {           // using cors so that it allow cors policy
          origin: "*",
        }
      });

    io.sockets.on('connection', function (socket) {
        console.log('new connection received',socket.id);

        socket.on('disconnect',function () {
            console.log('socket disconnected');
        });

        socket.on('join_room',function (data) {
            console.log('joining request received',data);

            socket.join(data.chatroom); // it will join the chatroom if it is present otherwise create a room named chatroom and enter the user

            io.in(data.chatroom).emit('user_joined',data); // to emit something in the chatroom we have to use io.in otherwise directly use emit
        });

        socket.on('send_message',function (data) {
            io.in(data.chatroom).emit('receive_message',data);
        })
    });
}