<template>
  <div class="chat">
    <h1 class="user">用户：{{currentUser.username}}</h1>
    <!-- 聊天列表 -->

    <div class="chatlist">
      <!-- 聊天内容列表 -->
      <chat-item v-for="(item,index) in chatList" :chatitem="item" :key="index">{{item.chatcontent}}</chat-item>
    </div>

    <!-- 输入框 -->
    <chatinput-com :sendEvent="handleSendEvent"></chatinput-com>
  </div>
</template>

<script>
import chatinputCom from "./chatinputcom";
import chatItem from "./chatItem";

export default {
  props: ["currentUser"],
  components: {
    chatinputCom,
    chatItem
  },
  data() {
    return {
      chatList: [
        {
          user: {
            username: "小明",
            headerimg: require("../assets/img/头像1.jpeg")
          },
          chatcontent: "吃了吗？"
        }
      ]
    };
  },
  methods: {
    handleSendEvent: function(value) {
      console.log("this.$root", this);
      this.chatList.push({
        user: this.$root.$children[0].currentUser,
        chatcontent: value
      });
    }
  }
};
</script>

<style scoped>
.chat {
  width: 500px;
  height: 700px;
  border: 1px solid #ccc;
}
</style>