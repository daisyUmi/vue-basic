<template>
  <div id="app">
    <alert-com  v-if="isVisible" :title="title" :content="content" :cancelEvent="cancelEvent" :comfirmEvent="comfirmEvent"></alert-com>
  </div>
</template>

<script>
import AlertCom from './components/AlertCom.vue'

export default {
  name: 'App',
  components: {
    AlertCom
  },
  data(){
    return {
      isVisible: true,
      title:'跳转页面',
      content:'是否跳转至百度'
    }
  },
  methods:{
    cancelEvent:function(){
      this.isVisible = false
    },

    comfirmEvent:function(){
      location.href = 'http://www.baidu.com'
    }
  }

}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
</style>
