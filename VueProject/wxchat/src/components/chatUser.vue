<template>
  <div class="chatuser">
    <div class="header">
      <span class="back" @click="closeChat">&lt;</span>
      <div>{{touser.username}}</div>
    </div>
    <div class="chatlist" ref="chatbox">
      <div
        class="chatItem"
        v-for="(item,index) in chatlist"
        :class="{self:$root.me.username == item.from.username}"
        :key="index"
      >
        <div class="header">
          <img :src="item.from.headerimg" alt />
        </div>
        <div class="chatContent">{{item.content}}</div>
      </div>
    </div>
    <div class="inputcom">
      <button>表情</button>
      <input type="text" v-model="inputData" @keydown.enter="sendEvent" />
      <button @click="sendEvent">发送</button>
    </div>
  </div>
</template>

<script>
import socket from "../socket";

export default {
  props: ["touser", "closeChat",'newmsg'],
  data() {
    return {
      inputData: "",
      chatlist: []
    };
  },
  methods: {
    sendEvent: function() {
      let msg = {
        from: this.$root.me,
        to: this.touser,
        content: this.inputData,
        time: new Date().getTime()
      };
      //发送到服务端
      socket.emit("sendMsg".msg);
      this.chatlist.push(msg);

      //保存聊天到本地
      this.saveStorage();
    },
    saveStorage() {
      let strKey =
        "chat-user-" + this.$root.me.username + "-" + this.touser.username;
      localStorage[strKey] = JSON.stringify(this.chatlist);
    },
    getStorage() {
      let strKey =
        "chat-user-" + this.$root.me.username + "-" + this.touser.username;
      this.chatlist = JSON.parse(localStorage[strKey]);
      // console.log(this.chatlist);
    },
    toBottom() {
      //自动滚动到最底部
      let chatbox = this.$refs.chatbox;
      chatbox.scrollTop = chatbox.scrollHeight - chatbox.clientHeight;
    }
  },
  beforeMount() {
    this.getStorage();
    socket.emit("readMsg", {
      self: this.$root.me.username,
      username: this.touser.username
    });
  },
  mounted() {
    // console.log("ref...this", this);
    this.toBottom();

    this.un
  },
  updated(){
    this.toBottom()
  },
  watch:{
    newmsg:function(val){
      this.chatlist.push(val);
      this.saveStorage();
    }
  }
};
</script>

<style scoped>
.chatItem {
  display: flex;
  margin: 5px 10px;
}

.chatItem .self {
  flex-direction: row-reverse;
  justify-content: flex-start;
}

.chatItem .header img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

/* 左侧聊天框 */
.chatItem .chatContent {
  background: #bbbbbb;
  border-radius: 5px;
  padding: 8px 10px;
  color: #ffffff;
  margin: 0px 0px 0px 20px;
  line-height: 34px;
  position: relative;
}

/* 右侧聊天框 */
.chatItem .self .chatContent {
  background: #bbbbbb;
  border-radius: 5px;
  padding: 8px 10px;
  color: #ffffff;
  margin: 0px 20px 0px 0px;
  line-height: 34px;
  position: relative;
}

/* 箭头在左边 */
.chatItem .chatContent::before {
  display: block;
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-right: 10px solid #bbbbbb;
  border-top: 10px solid transparent;
  border-bottom: 5px solid transparent;
  top: 20px;
  /* 左 */
  left: -10px;
}

/* 箭头在右边 */
.chatItem .self .chatContent::before {
  display: block;
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid #bbbbbb;
  border-top: 10px solid transparent;
  border-bottom: 5px solid transparent;
  top: 20px;
  /* 右 */
  right: -10px;

  /* initial 关键字用于设置 CSS 属性为它的默认值。 */
  left: initial;
  border-right: initial;
}

.chatuser {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  background: #efefef;
}

.chatuser > .header {
  position: relative;
}

.chatuser .back {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
}

.header {
  font-size: 18px;
  font-weight: 900;
  background: skyblue;
  height: 40px;
  text-align: center;
  line-height: 40px;
}

.chatlist {
  flex: 1;
  overflow: scroll;
}

.inputcom {
  height: 50px;
  display: flex;
  background: #eeeeee;
  justify-content: space-around;
}

.inputcom input {
  width: 270px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #cccccc;
  margin: 0 5px;
}

.inputcom input {
  width: 80px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #cccccc;
}
</style>