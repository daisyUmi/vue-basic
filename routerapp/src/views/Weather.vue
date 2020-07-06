<template>
  <div>
    <h1>天气</h1>
    <h2>城市：{{city}}</h2>
    <h3>穿衣指数：{{chuanyi}}</h3>
    <h3>洗车：{{xiche}}</h3>

    <router-link to='/about'>进入about</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      city: null,
      chuanyi: null,
      xiche: null
    };
  },
  async beforeMount() {
    let key = "c82b029328724bbb846b1b2e42a21098";
    let httpUrl = `https://free-api.heweather.net/s6/weather/lifestyle?location=${this.$route.params.city}&key=${key}`;

    axios.get(httpUrl).then(
      res => {
        //   let res = await axios.get(httpUrl);
        // console.log(res);
        let data = res.data;

        this.city = data.HeWeather6[0].basic.location;
        this.chuanyi = data.HeWeather6[0].lifestyle[1].txt;
        this.xiche = data.HeWeather6[0].lifestyle[6].txt;
         console.log(this.$route);
      },
      (err) => {
        console.log(err);
      }
    );
  }
};
</script>