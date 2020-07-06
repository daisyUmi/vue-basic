let socketio = {}

function getSocket(server) {
    socketio.io = require('socket.io')(server);

    let io = socketio.io;
    io.on('connection', (socket) => {
        //此处socket是当前浏览器某个浏览器与服务器的连接对象

        //当新的用户连接进来时，向所有人广播此人的id
        io.cockets.emit('addUser', {
            id: socket.id,
            content: '新用户加入'
        })

        socket.emit('news', { hello: 'world' });

        socket.on('my other event', (data) => {
            console.log(data);
            socket.emit('hello', { conent: "学习前端" })
        });

        //向某个用户发送消息
        socket.on('sendUser', function (data) {
            // data = {
            //     from:'发送者',
            //     to:'接收者Id',
            //     content:'xxxxxx'
            // }

            socket.to(data.to).emit('sendClient', data)
        })

        socket.on('addRoom',function(data){
            console.log(room)
            let roomObj = socket.join(data.room)
            // console.log(roomObj)
        })

        //监听群聊事件并且广播给所有人
        socket.on('sendMsgRoom',function(data){
            console.log(data)
            socket.to(data.room).emit('qunliao',data)
        })
    });


    //qq命名空间
    let qq = io.of('/qq');
    qq.on('connection', function () {
        qq.emit('news', { content: 'qq命名空间发送过来的内容' })
    })

    //微信命名空间
    let wx = io.of('/wx');
    wx.on('connection', function () {
        wx.emit('news', { content: 'wx命名空间发送过来的内容' })
    })
}

socketio.getSocket = getSocket;

module.exports = socketio