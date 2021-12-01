<template>
  <div class="find">
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="searchbtn"
        slot="title"
        size="small"
        round
        type="info"
        icon="search"
        to="/search"
      >
        搜索
      </van-button>
      <van-icon
        size="25"
        slot="left"
        name="bar-chart-o"
        color="#707177"
        @click="showPopup"
      ></van-icon>
      <van-icon
        size="25"
        slot="right"
        name="service"
        color="#707177"
      ></van-icon>
    </van-nav-bar>
    <div class="components">
      <Swipe />
      <List />
      <Songtitle />
      <Recommendedlist />
      <Newdisc></Newdisc>
    </div>
    <van-popup
      v-model="show"
      position="left"
      :style="{ height: '100%', width: '50%' }"
      round
    >
      个人信息1!!！！！！！！！!!!!! 施工中</van-popup
    >
  </div>
</template>

<script>
import Swipe from "./components/Swipe.vue";
import Songtitle from "./components/recommendsong.vue";
import Recommendedlist from "./components/recommendedlist.vue";
import List from "./components/recommendlist.vue";
import Newdisc from "./components/Newdisc.vue";
export default {
  name: "find",
  components: {
    Swipe,
    List,
    Songtitle,
    Recommendedlist,
    Newdisc,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.find {
  .app-nav-bar {
    background: linear-gradient(90deg, rgb(254, 255, 179), rgb(213, 184, 255));
    margin-bottom: 20px;
    .searchbtn {
      /deep/ .van-nav-bar__title {
        max-width: none;
      }
      width: 215px;
      height: 32px;
      background: #fbfbfc;
      border: none;
      /deep/ .van-button__text {
        color: #e5e5e6;
      }
      /deep/ .van-icon-search {
        color: #e3e3e4;
      }
    }
  }
  .components {
    height: 80vh;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
