<template>
  <div>
    <h1>新闻中心:{{id}}{{username}}</h1>
  </div>
</template>

<script>
export default {
  props: ["id", "username"],
  mounted() {
    console.log("this", this);
  }
};
</script>