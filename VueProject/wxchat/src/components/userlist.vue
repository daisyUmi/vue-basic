<template>
  <div class="userlist">
    <div class="nav">
      <div class="headerimg" :class="{online:islogin}">
        <img v-if="$root.me!==null" :src="$root.me.headerimg" alt />
      </div>
      <div class="title">消息</div>
      <div class="headerimg"></div>
    </div>
    <div class="users">
      <div @click="chooseUser(item)" class="useritem" v-for="(item,index) in friends" :key="index">

        <div class="left" :class="{online: item.isonline==='true',unread:unreadlist.indexOf(item.username)!==-1}">
          <img :src="item.headerimg" />
        </div>

        <div class="right">
          <span class="username">{{item.username}}</span>
          <span class="msg"></span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["islogin", "users", "unreadlist"],
  computed: {
    friends: function() {
      let friends = [];
      let username = this.$root.me.username;
      if (username) {
        friends = this.users.filter((item, index) => {
          return item.username !== username;
        });
      }
      return friends;
    }
  },
  mounted(){
    console.log(this.unreadlist)
  }
};
</script>

<style scoped>
.unread{
  position: relative;
}
.unread::before{
  position: absolute;
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: red;
  bottom:5px;
  right:5px;
}

.useritem {
  display: flex;
  height: 80px;
  border-bottom: 1px solid #cccccc;
  background: #eeeeee;
  align-items: center;
  padding: 0 10px;
}

.useritem .left {
  filter: grayscale(1);
}

.useritem .left img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.useritem .right {
  padding: 0 10px;
}

.nav {
  width: 75px;
  height: 80px;
  background: skyblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav .title {
  font-weight: 900;
  font-size: 18px;
}

.headerimg {
  margin: 0 10px;
  width: 50px;
  height: 50px;
  filter: grayscale(1);
}

.headerimg img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.online {
  /* 滤镜： 数字1：为灰色；0：为没有颜色 */
  filter: grayscale(0) !important;
}
</style>