let socketio = {}
let sqlQuery = require('./module/lcMysql')

function getSocket(server) {
    socketio.io = require('socket.io')(server);

    let io = socketio.io;
    io.on('connection', (socket) => {
        console.log(socket.id + '建立连接')

        //监听登录事件
        socket.on('login', async function (data) {
            //先判断是否有人在登录
            let sqlStr1 = 'select * from user where isonline =? and username =?'
            let result1 = await sqlQuery(sqlStr1, ['true', data.username])

            if (result1.length > 0) {
                socket.to(result1[0].socketid).emit('logout', {
                    content: '有人登录进来，强制将你踢出去！'
                })
            }

            //修改数据库登录信息（socketid,isonline）
            let sqlStr = 'update user set socketid=?,isonline=? where username =?'
            let result = await sqlQuery(sqlStr, [socket.id, 'true', data.username])

            socket.emit('login', {
                state: 'ok',
                content: '登录成功'
            })

            let sqlStr2 = 'select * from user'
            //等待获取mysql查询结果
            let result2 = await sqlQuery(sqlStr2)
            io.sockets.emit('users', Array.from(result2))   // io.sockets所有人

            //最新未接收的消息
            let sqlStr3 = 'select * from chat where isread = ? and `to` =? '
            let result3 = await sqlQuery(sqlStr3, ['false', data.username])
            //发送出去
            socket.emit('unreadMsg', Array.from(result3))

            //加入群（房间）
            // 获取所有的群
            let sqlStr4 = 'select * from user where isgroup =?';
            let result4 = await sqlQuery(sqlStr4,['true'])
            
            Array.from(result4).forEach((item,index)=>{
                item.socket.join(item.socketid)

            })
                        
        })

        //监听断开事件
        socket.on('disconnect', async function (data) {

            //修改数据库登录信息（socketid,isonline）
            let sqlStr = 'update user set socketid=?,isonline=? where socketid =?'
            let result = await sqlQuery(sqlStr, [null, null, socket.id])
        })

        //监听事件
        socket.on('users', async function (data) {
            let sqlStr = 'select * from user'
            //等待获取mysql查询结果
            let result = await sqlQuery(sqlStr)
            socket.emit('users', Array.from(result))
        })

        socket.on('sendMsg', async function (msg) {
            // console.log(msg)
            // 判断接收者是否在线
            let strSql = 'select * from user where username =? and isonline=?'
            let result = await sqlQuery(strSql, [msg.to.username, 'true'])
            if (result.length > 0) {
                // 如果此人在线，那么直接发送消息
                let toid = result[0].socketid;
                socket.to(toid).emit('accept',msg)

                //将聊天内容存放到数据库，其中设置为已读
                let strSql1 = 'insert into chat(`from`,`to`,content,`time`,isread) values (?,?,?,?,?)';   //chat为表名
                let arr1 = [msg.from.username, msg.to.username, msg.content, msg.time, 'true']

                sqlQuery(strSql1, arr1)

            } else {
                //若不在线，将聊天内容存放到数据库，其中设置为未读
                let strSql1 = 'insert into chat(`from`,`to`,content,`time`,isread) values (?,?,?,?,?)';
                let arr1 = [msg.from.username, msg.to.username, msg.content, msg.time, 'false']

                sqlQuery(strSql1, arr1)
            }

        })

        //如果收到已读消息，将已读信息改为true
        socket.on('readMsg',async function (data) {
            let sqlStr = 'update chat set isread =? where `from` =? and `to` =?'
            let result = await sqlQuery(sqlStr, ['true', data.username, data.self.username])


        })

    });

}
socketio.getSocket = getSocket;

module.exports = socketio