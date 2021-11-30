<template>
  <div class="Recommendedlist auto">
    <div class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in songs" :key="index">
          <router-link
            :to="{
              name: 'songsinfo',
              params: {
                id: item.id,
              },
            }"
          >
            <div class="pic">
              <img :src="item.picUrl" alt="" class="pic" />
            </div>
            <div class="count">{{ item.playCount | handleNum }}</div>
          </router-link>
          <div class="title van-multi-ellipsis--l2">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getrecommendsong } from "@/api/find.js";
// import { handleNum } from "@/utils/formatnumbers.js";
export default {
  name: "Recommendedlist",
  data() {
    return {
      songs: [],
    };
  },
  created() {
    this.getrecommendsong();
  },
  methods: {
    async getrecommendsong() {
      let { data } = await getrecommendsong();
      // console.log(data.result);
      this.songs = data.result;
    },
  },
  filters: {
    handleNum(num) {
      if (num > 100000000) {
        num = (num / 100000000).toFixed(2);
        return num + "亿";
      } else if (num > 10000) {
        num = (num / 1000).toFixed(2);
        return num + "万";
      } else {
        return num;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.Recommendedlist {
  height: 120px;
  overflow-x: auto;
  overflow-y: hidden;
}
.swiper {
  width: 100px;
}

.swiper-slide {
  margin-right: 10px;
  position: relative;
}
.pic {
  width: 100%;
  height: 100px;
}
.pic > img {
  border-radius: 18px;
  width: 100%;
  height: 100%;
}
.count {
  position: absolute;
  right: 5px;
  top: 5px;
  color: antiquewhite;
}
</style>
