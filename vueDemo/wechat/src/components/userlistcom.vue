<template>
  <div class="userlist">
    <h1>用户列表</h1>
    <ul>
      <li v-for="(item,index) in userlist" @click="chooseUser(index)" :key="'userlist'+ index">
        <img :src="item.headerimg" />
        <h3>{{item.username}}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["userlist"],
  methods:{
      chooseUser:function(index){
          //将选择用户的事件触发，发送给父元素
          this.$emit('chooseuser',index)
      }
  }
};
</script>

<style scoped="this api replaced by slot-scope in 2.5.0+">
.userlist {
  width: 300px;
  height: 700px;
  background: skyblue;
}

.userlist ul li {
  display: flex;
}

.userlist ul li img {
  width: 80px;
  height: 80px;
}

/* 全局 （要是只想改变这一个组件就在样式标签上加 scoped="this api replaced by slot-scope in 2.5.0+"）或者scoped*/
.redbg {
  background: pink;
}
</style>