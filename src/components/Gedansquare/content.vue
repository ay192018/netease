<template>
  <div class="content">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <div class="all">
        <div class="swiper-slide" v-for="(item, index) in list" :key="index">
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
    </van-list>
  </div>
</template>

<script>
import { getallGedan } from "@/api/Gedansquare.js";
export default {
  name: "contents",
  data() {
    return {
      list: [], //存储列表数据
      loading: false,
      finished: false,
      lasttime: null, //请求下一页的时间戳
      error: false, //控制请求失败的
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      const { data } = await getallGedan({
        limit: 99999,
        before: this.lasttime || Date.now(),
        cat: this.item.name,
      });
      console.log(data);
      //   this.lasttime = data.lasttime;
      //   console.log(this.lasttime);
      const { playlists } = data;
      console.log(playlists);
      this.list.push(...playlists);
      this.loading = false;
      if (playlists.length) {
        this.lasttime = data.lasttime;
        //更新获取下一页数据的时间戳
      } else {
        //没有数据了，讲finished设置为true
        this.finished = true;
      }
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

<style scoped>
.content {
  width: 95vw;
  height: 80vh;
  overflow-y: auto;
  margin-left: 18px;
  margin-top: 12px;
}
.swiper-slide {
  width: 100px;
  margin-right: 18px;
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
.all {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
