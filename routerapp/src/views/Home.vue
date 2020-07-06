<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/me">个人中心</router-link>|
      <router-link to="/news">新闻中心</router-link>|
      <router-link to="/list">list</router-link>
    </div>
    <button @click="goEvent">跳转至新闻页</button>
    <button @click="toGo">前进</button>
    <button @click="toBack">后退</button>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  methods: {
    goEvent: function() {
      // 通过路径跳转
      this.$router.push({
        path: "/news/123",
        query: {
          username: "xiaoming",
          password: "324324"
        }
      });

      // //通过名称跳转
      // this.$router.push({
      //   name:'News',
      //   params:{
      //     id:'123'
      //   }
      // })

      //替换
      // this.$router.replace(
      //   {
      //     path: "/news/123",
      //     query: {
      //       username: "xiaoming",
      //       password: "324324"
      //     }
      //   },
      //   function() {
      //     console.log("成功替换页面");
      //   }
      // );
    },
    toGo: function() {
      this.$router.go(1);
    },
    toBack: function() {
      this.$router.go(-1);
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log("从" + from.path + "离开");
    next();
  },
  mounted() {
    console.log('this.$route',this.$route);
  }
};
</script>
