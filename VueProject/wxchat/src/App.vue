<template>
  <div id="app">
    <choose-user :userlist="userlist" v-if="$root.me===null"></choose-user>
    <userlist :islogin="islogin" :users="users" :chooseUser="chooseUser" :unreadlist="unreadlist"></userlist>
    <chat-user v-if="ischat" :touser="touser" :closeChat="closeChat" :newmsg="newmsg"></chat-user>
  </div>
</template>

<script>
import chooseUser from "./components/chooseUser";
import userlist from "./components/userlist";
import chatUser from "./components/chatUser";

import axios from "axios";
import socket from "./socket";

export default {
  name: "App",
  components: {
    chooseUser,
    userlist,
    chatUser
  },
  data() {
    return {
      originData: [
        {
          username: "小明",
          headerimg: require("./assets/img/头像1.jpeg"),
          isonline: null,
          socketid: "",
          id: 1
        },
        {
          username: "小黑",
          headerimg: require("./assets/img/头像2.jpeg"),
          isonline: null,
          socketid: "",
          id: 2
        },
        {
          username: "小红",
          headerimg: require("./assets/img/头像3.jpeg"),
          isonline: null,
          socketid: "",
          id: 3
        },
        {
          username: "小白",
          headerimg: require("./assets/img/头像4.jpeg"),
          isonline: null,
          socketid: "",
          id: 4
        }
      ],
      userlist: [],
      me: null,
      islogin: false,
      users: [],
      touser: null,
      ischat: false,
      unreadlist: [],
      newmsg: null
    };
  },
  methods: {
    chooseUser: function(user) {
      this.touser = user;
      this.ischat = true;

      //选择聊天用户时，删除未读小红点
      let index = this.unreadlist.indexOf(user.username);
      this.unreadlist.splice(index, 1);
    },
    closeChat: function() {
      this.ischat = false;
    }
  },
  computed: {
    usersOBJ: function() {
      let obj = {};
      this.users.forEach((item, index) => {
        obj[item.username] = item;
      });
      return obj;
    }
  },
  beforeMount() {
    this.userlist = this.originData;
    // let res = await axios.get('http://localhost:3000/api/userlist').then(function(res){
    //   console.log(res)
    //   this.userlist = res.data
    // })
  },
  mounted() {
    //监听登录事件，登录成功设置为true
    socket.on("login", data => {
      if (data.state === "ok") {
        this.islogin = true;
      }
    });

    //监听登出事件
    socket.on("logout", data => {
      console.log(data);
      this.islogin = false;

      // 断开连接
      socket.disconnect();
    });

    // 监听断开连接事件
    socket.on("disconnect", data => {
      console.log("断开连接");
    });

    // 监听事件
    socket.on("users", data => {
      console.log(data);
      this.users = data;
    });

    // 监听未读消息事件
    socket.on("unreadMsg", data => {
      // console.log('unreadMsg',data);

      data.forEach((item, index) => {
        // 设置未读的红点
        // 将聊天的内容分别添加到本地的存储
        // 将from/to改成有头像的对象
        item.from = this.usersOBJ[item.from];
        item.to = this.usersOBJ[item.to];
        this.unreadlist.push(item.from);

        let strKey =
          "chat-user-" + this.$root.me.username + "-" + item.from.username;

        localStorage[strKey] = localStorage[strKey] ? localStorage[strKey] : [];
        //先解析本地存储的数据，再添加
        let newArr = JSON.parse(localStorage[strKey]);
        newArr.push(item);
        localStorage[strKey] = JSON.stringify(newArr);

        // console.log('usersOBJ',usersOBJ)
      });
    });

    socket.on("accept", msg => {
      

      if (
        ( this.ischat === true && msg.from.username == this.touser.username )||    //个人接收
        (msg.to.username = this.touser.username && msg,to.isgroup =='true')        //群组接收
      ) {
        //如果接收者打开页面
        this.newmsg = msg;
      } else {
        //如果接收者没有打开页面
        //1.保存数据
        let strKey =
          "chat-user-" + this.$root.me.username + "-" + msg.from.username;
        localStorage[strKey] = localStorage[strKey] ? localStorage[strKey] : [];
        //先解析本地存储的数据，再添加
        let newArr = JSON.parse(localStorage[strKey]);

        newArr.push(item);
        localStorage[strKey] = JSON.stringify(newArr);

        //2.显示红点
        this.unreadlist.push(msg.from.username);
      }
    });
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
