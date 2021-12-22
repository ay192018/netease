<template>
  <div class="Swipe animate__jello animate__animated">
    <van-swipe :autoplay="2000" :duration="300" indicator-color="#fff">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getbanner } from "@/api/find.js";

export default {
  name: "Swipe",
  data() {
    return {
      images: [],
    };
  },
  created() {
    this.getbanner();
  },
  methods: {
    getbanner() {
      getbanner()
        .then(({ data }) => {
          // console.log(data.banners);
          this.images = data.banners;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.Swipe {
  width: 350px;
  height: 150px;
  margin: auto;
  /deep/ .van-swipe-item {
    & img {
      width: 100%;
      height: 150px;
    }
  }
  /deep/ .van-swipe {
    border-radius: 15px;
  }
}
</style>
