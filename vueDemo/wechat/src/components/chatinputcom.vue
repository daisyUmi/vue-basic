<template>
  <div>
    <input type="text" @keydown.enter="handleSend" v-model="inputContent" />
    <button @click="handleSend">发送</button>
  </div>
</template>
<script>
export default {
  props: ["sendEvent"],
  data() {
    return {
      inputContent: ""
    };
  },
  methods: {
    handleSend: function() {
      //传给父组件
      this.sendEvent(this.inputContent);
      //清空
      this.inputContent = "";
    }
  }
};
</script>