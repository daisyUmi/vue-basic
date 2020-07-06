<template>
    <div>
        <h1>个人中心</h1>
        <button @click="goAbout">按钮</button>
    </div>
</template>

<script>
export default {
    methods:{
        goAbout(event){
            console.log(this)
            this.$router.push({
                path:'about'
            })
        }
    }
}
</script>