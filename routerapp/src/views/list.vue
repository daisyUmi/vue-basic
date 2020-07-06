<template>
    <div class="list">
        <ul>
            <li v-for="(item,index) in list" :key="index">新闻列表{{index}}</li>
        </ul>
    </div>
</template>

<script>
    let arr = [];
    arr.length = 100;
export default {
    data(){
        return{
            list:arr
        }
    }
}
</script>

<style scoped>
/* .list{
    height :300px;
    overflow: scroll;
} */
</style>