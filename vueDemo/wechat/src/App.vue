<template>
  <div id="app">
    <!-- <h1>{{msg}}</h1> -->

    <div class="content">
      <chat-com :currentUser="currentUser"></chat-com>
      <userlist-com @chooseuser="toggleUser" :userlist="userlist"></userlist-com>
    </div>
  </div>
</template>

<script>
import chatCom from "./components/chatcom";
import userlistCom from "./components/userlistcom";

export default {
  name: "App",
  components: {
    chatCom,
    userlistCom
  },
  data() {
    return {
      msg: "hello",
      userlist: [
        {
          username: "小明",
          headerimg: require("./assets/img/头像1.jpeg")
        },
        {
          username: "小黑",
          headerimg: require("./assets/img/头像2.jpeg")
        },
        {
          username: "小红",
          headerimg: require("./assets/img/头像3.jpeg")
        },
        {
          username: "小白",
          headerimg: require("./assets/img/头像4.jpeg")
        }
      ],
      currentUser: {
          username: "小明",
          headerimg: require("./assets/img/头像1.jpeg")
        }
    };
  },
  methods:{
    toggleUser:function(index){
      this.currentUser = this.userlist[index]
    }
  }
};
</script>

<style scoped>
.content{
  display: flex;
  width:800px;
  height:700px;
  /* 居中 */
  margin: 0 auto;  
} 
</style>
