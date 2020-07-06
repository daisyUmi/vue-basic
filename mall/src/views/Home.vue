<template>
  <div id="home" class="home">
    <van-search v-model="searchData" placeholder="商品搜索 共239款好物" input-align="center" />

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" :width="375" :heigth="200">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swiperimg" v-lazy="image.image" />
      </van-swipe-item>
    </van-swipe>

    <!-- 5个图标 -->
    <van-grid :column-num="5">
      <van-grid-item v-for="(item,index) in channel" :icon="item.icon_url" :key="index" :text="item.name"/>
    </van-grid>

    <!-- 品牌制造商直供面板 -->
    <div>
    <van-panel title="品牌制造商直供面板" >
        <van-grid :column-num="2">
          <van-grid-item v-for="(item,index) in brandList" :key="index">
            <van-image  :src="item.new_pic_url" lazy-load/>
          </van-grid-item>
        </van-grid>
      </van-panel>
    </div>



  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
import api from "../assets/config/api";
import "../mock/index.js";
import Vue from "vue";
import { Lazyload } from "vant";

Vue.use(Lazyload);

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data: function() {
    return {
      searchData: "",
      data: {}
    };
  },
  computed: {
    images: function() {
      if (typeof this.data.banner == "object") {
        return this.data.banner;
      } else {
        return [];
      }
    },
    channel: function() {
      if (typeof this.data.channel == "object") {
        return this.data.channel;
      } else {
        return [];
      }
    },
    brandList: function() {
      if (typeof this.data.brandList == "object") {
        return this.data.brandList;
      } else {
        return [];
      }
    }
  },
  async mounted() {
    // let result =await axios.get(api.IndexUrl)
    // console.log('result',result)

    let result = await axios.get("/index");
    this.data = result.data.data;
    console.log("result", this.data);
  }
};
</script>
<style lang='less' scoped>
#home {
  .swiperimg {
    width: 375px;
    height: 200px;
  }
}
</style>
