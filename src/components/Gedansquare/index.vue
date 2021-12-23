<template>
  <div class="Gedansquare">
    <van-nav-bar
      class="app-nav-bar"
      title="歌单广场"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab
        v-for="(item, index) in channels"
        :title="item.name"
        :key="index"
      
      >
        <Content :item="item"></Content>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getGedansquare, getallGedan } from "@/api/Gedansquare.js";

import Content from "./content.vue";
export default {
  name: "Gedansquare",
  components: {
    Content,
  },
  data() {
    return {
      channels: [],
      active: 0,
      lasttime: null,
    };
  },
  methods: {
    async getGedansquare() {
      const { data } = await getGedansquare();
      console.log(data);
      this.channels = data.tags;
    },
  },
  created() {
    this.getGedansquare();
  },
};
</script>

<style lang="less" scoped>
/deep/ .app-nav-bar,
.van-nav-bar,
.van-hairline--bottom {
  background: transparent;
}
/deep/ .van-tabs__nav,
.van-tabs__nav--line,
.van-tabs__nav--complete {
  background: transparent;
}
</style>
