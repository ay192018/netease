<template>
  <div class="Newdisc">
    <van-cell title="新碟">
      <template #right-icon>
        <van-button
          round
          type="info"
          size="mini"
          color="linear-gradient(to right, #ffd1b8, #d59eff)"
          >点击更多</van-button
        >
      </template>
    </van-cell>

    <div class="all">
      <div class="swiper-slide" v-for="(item, index) in playlist" :key="index">
        <router-link
          :to="{
            name: 'songsinfo',
            params: {
              id: item.id,
            },
          }"
        >
          <div class="pic">
            <img :src="item.coverImgUrl" alt="" class="pic" />
          </div>
          <div class="count">{{ item.playCount | handleNum }}</div>
        </router-link>
        <div class="title van-multi-ellipsis--l2">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getallxindie, getjingxuanxindie } from "@/api/find.js";
export default {
  name: "Newdisc",
  data() {
    return {
      albums: [], //全部歌单
      playlist: [], //精选歌单
    };
  },
  methods: {
    async getallxindie() {
      const cookie = localStorage.getItem("cookie");
      const { data } = await getallxindie(cookie, 1000000);
      console.log(data);
      this.albums = data.albums;
    },
    async getjingxuanxindie() {
      const cookie = localStorage.getItem("cookie");
      const { data } = await getjingxuanxindie(cookie, 1000000);
      // console.log(data);
      this.playlist = data.playlists;
    },
  },
  created() {
    this.getallxindie();
    this.getjingxuanxindie();
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
.Newdisc {
  width: 100vw;
  margin-left: 10px;
  background: transparent;
}

.swiper-slide {
  width: 100px;
  margin-right: 18px;
  position: relative;
  float: left;
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
.all {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
/deep/ .van-cell {
  background: transparent;
}
.title {
  height: 40px;
}
</style>
