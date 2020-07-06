//引入express实例化app
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80);
// WARNING: app.listen(80) will NOT work here!

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', (data) => {
        console.log(data);
    });
});

// 第一步安装： npm install --save express  (使用express --version查看版本号，如果无法识别，是因为该版本号为4点多，所以需要安装npm install -g express-generator)
// 第二步启动： node expressApp.js
// 然后可以查看： http://localhost:80