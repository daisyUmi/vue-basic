<template>
  <div class="chooseUser">
    <h1>请选择你聊天的角色</h1>

    <div class="list">
      <div class="item" @click="chooseEvent(item)" v-for="(item,index) in userlist" :key="index">
        <img :src="item.headerimg" alt />
        <span>{{item.username}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import socket from '../socket';

export default {
  props: ["userlist"],
  methods:{
      chooseEvent:function(user){
          this.$root.me = user
          localStorage.chatme = JSON.stringify(user)

          console.log('socket',socket)
          socket.emit('login',user)
      }
  }
};
</script>

<style scoped>
.chooseUser {
  /* 宽高为百分之百 */
  width: 100vw;
  height: 100vh;
  background: skyblue;
}

.chooseUser h1 {
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}

.list {
  display: flex;
  /* 允许换行 */
  flex-wrap: wrap;
}

.item {
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 130px;
  margin: 15px 0px;
}

.item img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
</style>