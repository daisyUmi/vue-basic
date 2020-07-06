//创建一个http服务器
const app = require('http').createServer(handler)

//引用socket.io对象，用socket.io对象去实例化app,然后通过io来实现一个数据的双向绑定和连接
const io = require('socket.io')(app);
const fs = require('fs');

//监听80的端口
app.listen(80);

//处理web服务器正常的请求
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

//实时通讯的连接
//io.on('connection'，事件的回调函数)  //监听socketio的连接事件
io.on('connection', (socket) => {

  //发送一个名字为news的事件（名称可修改），将数据对象'{ hello: 'world' }'发送给客户端
  socket.emit('news', { hello: 'world' });   

  //监听客户端发送过来的内容
  socket.on('my other event', (data) => {
    console.log(data);
  });
});