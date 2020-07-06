<template>
  <div id="app">
    <!-- 导航 -->
    <router-view name="nav" />
    <!-- 侧边栏 -->
    <router-view name="aside" />

    <transition
      name="slide"
      mode="out-in"
      enter-active-class="animated bounceOutLeft"
      leave-active-class="animated bounceOutRight"
    >
      <keep-alive>
        <!-- 主要内容 -->
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  watch: {
    $route: function(val) {
      // console.log('路由发生改变')
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.content {
  width: 200px;
  height: 200px;
  background-color: #87ceeb;
}
/* 淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* 滑动 */
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
		/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
